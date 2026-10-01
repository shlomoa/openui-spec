/**
 * Parse OpenUI documents into a typed object model and validate them.
 *
 * The TypeScript twin of the Python module `bin/openui_document.py`: the same four
 * stages, the same diagnostic codes and paths, and the same results on the shared
 * conformance suite (`spec/conformance/`).
 *
 * 1. grammar: `spec/openui.schema.json`, the JSON Schema projection of the document
 *    format in `spec/EBNF.txt`;
 * 2. document: globally unique ids and the spec version;
 * 3. catalog: every type is a known object type of `spec/openui.json`;
 * 4. contract: every declared attribute fits its declared value type, and every
 *    literal element reference resolves to an element of an allowed type.
 *
 * A grammar diagnostic stops the pipeline; the other stages all run.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020";
import type { ErrorObject, ValidateFunction } from "ajv";

const VALUE_TYPE_PATTERN = /^([a-z]+)(?:\((.*)\))?$/;

/** The bundled catalog of the spec version this package implements. */
export const DEFAULT_CATALOG_PATH = path.resolve(__dirname, "..", "..", "spec", "openui.json");
export const DEFAULT_SCHEMA_PATH = path.resolve(__dirname, "..", "..", "spec", "openui.schema.json");

type JsonObject = Record<string, any>;

/** One broken rule: a stage-prefixed code, a JSON Pointer and a free-text message. */
export class Diagnostic {
  constructor(
    readonly code: string,
    readonly path: string,
    readonly message: string,
  ) {}

  toString(): string {
    return `${this.path || "/"}: ${this.code}: ${this.message}`;
  }
}

/** Thrown by `parse` when the document breaks the grammar. */
export class OpenUiParseError extends Error {
  constructor(readonly diagnostics: Diagnostic[]) {
    super(diagnostics.map(String).join("\n"));
    this.name = "OpenUiParseError";
  }
}

/** One `attrs` member: its key, category, name, raw JSON value and JSON Pointer. */
export class Attribute {
  constructor(
    readonly key: string,
    readonly category: string | null,
    readonly name: string,
    readonly value: unknown,
    readonly path: string,
  ) {}

  /** An unquoted string: a binding or target-language expression. */
  get isExpression(): boolean {
    return typeof this.value === "string" && decodeLiteral(this.value) === undefined;
  }

  /** The literal value: a decoded quoted string, or the JSON value itself. */
  get literal(): unknown {
    return typeof this.value === "string" ? (decodeLiteral(this.value) ?? null) : this.value;
  }
}

/** One element of the tree. */
export class Element {
  constructor(
    readonly id: string,
    readonly type: string,
    readonly path: string,
    readonly attributes: readonly Attribute[] = [],
    readonly children: readonly Element[] = [],
  ) {}

  /** Returns the attribute with `key`, or undefined. */
  attribute(key: string): Attribute | undefined {
    return this.attributes.find((attribute) => attribute.key === key);
  }

  /** Yields this element and every descendant, in document order. */
  *walk(): Generator<Element> {
    yield this;
    for (const child of this.children) {
      yield* child.walk();
    }
  }
}

/** A grammar-valid OpenUI document: its spec version and its root element. */
export class Document {
  constructor(
    readonly version: string,
    readonly root: Element,
  ) {}

  /** Every element in document order, root first. */
  elements(): Element[] {
    return [...this.root.walk()];
  }
}

/** One attribute a known type declares: its category and, for Uses, its value type. */
export interface Declaration {
  category: string;
  valueType: string | null;
}

/** The spec version, the known object types and their declared attributes. */
export class Catalog {
  constructor(
    readonly version: string,
    readonly knownTypes: ReadonlySet<string>,
    readonly contracts: ReadonlyMap<string, ReadonlyMap<string, Declaration>>,
  ) {}

  /**
   * Builds a catalog from a decoded `spec/openui.json` document. A leaf's attributes
   * sit on its instance node (id `<scopeId>Instance`); they also apply to the leaf's
   * scope type, which names the same object.
   */
  static fromValue(catalog: Record<string, any>): Catalog {
    const knownTypes = new Set<string>();
    const contracts = new Map<string, Map<string, Declaration>>();
    const declare = (type: string, declared: Map<string, Declaration>) => {
      const contract = contracts.get(type) ?? new Map<string, Declaration>();
      declared.forEach((declaration, name) => contract.set(name, declaration));
      contracts.set(type, contract);
    };
    const visit = (node: Record<string, any>, parent: Record<string, any> | undefined) => {
      knownTypes.add(node.type);
      const declared = new Map<string, Declaration>();
      for (const [key, value] of Object.entries(node.attrs ?? {})) {
        const [category, name] = attributeParts(key);
        if (category !== null) {
          declared.set(name, { category, valueType: typeof value === "string" ? value : null });
        }
      }
      if (declared.size > 0) {
        declare(node.type, declared);
        if (parent !== undefined && node.id === `${parent.id}Instance`) {
          declare(parent.type, declared);
        }
      }
      for (const child of node.children ?? []) {
        visit(child, node);
      }
    };
    visit(catalog, undefined);
    return new Catalog(catalog.version, knownTypes, contracts);
  }

  /** Loads a catalog from `filePath` (default: the bundled `spec/openui.json`). */
  static load(filePath: string = DEFAULT_CATALOG_PATH): Catalog {
    return Catalog.fromValue(JSON.parse(readFileSync(filePath, "utf8")));
  }
}

let bundledCatalog: Catalog | undefined;

/** The catalog of the spec version this package implements. */
export function defaultCatalog(): Catalog {
  bundledCatalog ??= Catalog.load();
  return bundledCatalog;
}

/** Parses `text` into a Document, or throws OpenUiParseError with grammar diagnostics. */
export function parse(text: string): Document {
  const { value, diagnostics } = decode(text);
  const all = diagnostics.length > 0 ? diagnostics : grammarDiagnostics(value);
  if (all.length > 0) {
    throw new OpenUiParseError(all);
  }
  return fromValue(value as Record<string, any>);
}

/** Builds a Document from a decoded, grammar-valid JSON value. */
export function fromValue(value: Record<string, any>): Document {
  return new Document(value.version, buildElement(value, ""));
}

/** Runs the document, catalog and contract stages on a parsed document. */
export function validate(document: Document, catalog: Catalog = defaultCatalog()): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  if (document.version !== catalog.version) {
    diagnostics.push(
      new Diagnostic(
        "document/unsupported-version",
        "/version",
        `spec version ${document.version} is not ${catalog.version}, the version this tool implements`,
      ),
    );
  }
  const elements = document.elements();
  const byId = new Map<string, Element>();
  for (const element of elements) {
    if (byId.has(element.id)) {
      diagnostics.push(new Diagnostic("document/duplicate-id", `${element.path}/id`, `duplicate object id: ${element.id}`));
    } else {
      byId.set(element.id, element);
    }
  }
  for (const element of elements) {
    if (!catalog.knownTypes.has(element.type)) {
      diagnostics.push(
        new Diagnostic("catalog/unknown-type", `${element.path}/type`, `unknown OpenUI object type: ${element.type}`),
      );
    }
  }
  for (const element of elements) {
    const declared = catalog.contracts.get(element.type);
    for (const attribute of element.attributes) {
      const declaration = declared?.get(attribute.name);
      if (declaration !== undefined && declaration.category === attribute.category) {
        diagnostics.push(...contractDiagnostics(attribute, declaration, byId));
      }
    }
  }
  return diagnostics;
}

/** Runs every stage on `text`; a grammar diagnostic stops the pipeline. */
export function validateText(text: string, catalog: Catalog = defaultCatalog()): Diagnostic[] {
  try {
    return validate(parse(text), catalog);
  } catch (error) {
    if (error instanceof OpenUiParseError) {
      return error.diagnostics;
    }
    throw error;
  }
}

/** Runs every stage on an already decoded JSON value (duplicate members are not visible). */
export function validateValue(
  value: unknown,
  catalog: Catalog = defaultCatalog(),
  schema: JsonObject = defaultSchema(),
): Diagnostic[] {
  const diagnostics = grammarDiagnostics(value, schema);
  return diagnostics.length > 0 ? diagnostics : validate(fromValue(value as Record<string, any>), catalog);
}

/** Returns schema-derived grammar diagnostics for a decoded JSON value. */
export function grammarDiagnostics(value: unknown, schema: JsonObject = defaultSchema()): Diagnostic[] {
  const validator = schema === defaultSchema() ? defaultSchemaValidator() : createSchemaValidator(schema);
  return schemaDiagnostics(value, validator);
}

/** Decodes JSON `text`; reports invalid JSON and duplicate object members. */
export function decode(text: string): { value: unknown; diagnostics: Diagnostic[] } {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch (error) {
    return {
      value: undefined,
      diagnostics: [new Diagnostic("grammar/json-syntax", "", `not JSON: ${error instanceof Error ? error.message : error}`)],
    };
  }
  const diagnostics = duplicatePaths(text).map(
    (duplicatePath) => new Diagnostic("grammar/duplicate-member", duplicatePath, `duplicate object member: ${duplicatePath}`),
  );
  return { value, diagnostics };
}

// --- grammar stage ------------------------------------------------------------------------

let bundledSchema: JsonObject | undefined;
let bundledSchemaValidator: ValidateFunction | undefined;

function defaultSchema(): JsonObject {
  bundledSchema ??= JSON.parse(readFileSync(DEFAULT_SCHEMA_PATH, "utf8")) as JsonObject;
  return bundledSchema;
}

function defaultSchemaValidator(): ValidateFunction {
  bundledSchemaValidator ??= createSchemaValidator(defaultSchema());
  return bundledSchemaValidator;
}

function createSchemaValidator(schema: JsonObject): ValidateFunction {
  return new Ajv2020({ allErrors: true, strict: false }).compile(schema);
}

function schemaDiagnostics(value: unknown, validator: ValidateFunction): Diagnostic[] {
  if (validator(value)) {
    return [];
  }
  const errors = validator.errors ?? [];
  const anyOfPaths = new Set(errors.filter((error) => error.keyword === "anyOf").map((error) => error.instancePath));
  return errors.flatMap((error) =>
    error.keyword !== "anyOf" && [...anyOfPaths].some((path) => error.instancePath === path || error.instancePath.startsWith(`${path}/`))
      ? []
      : schemaErrorDiagnostics(error),
  );
}

function schemaErrorDiagnostics(error: ErrorObject): Diagnostic[] {
  const path = error.instancePath;
  if (error.schemaPath.includes("/anyOf/") || error.keyword === "propertyNames") {
    return [];
  }
  if (error.keyword === "additionalProperties") {
    const key = (error.params as { additionalProperty: string }).additionalProperty;
    return [new Diagnostic("grammar/unknown-property", `${path}/${escapePointer(key)}`, `unknown member ${key}`)];
  }
  if (error.keyword === "required") {
    const key = (error.params as { missingProperty: string }).missingProperty;
    return [new Diagnostic("grammar/missing-property", `${path}/${escapePointer(key)}`, `missing required property ${key}`)];
  }
  if (error.keyword === "type") {
    return [new Diagnostic("grammar/invalid-member-type", path, error.message ?? "invalid JSON type")];
  }
  if (error.keyword === "const") {
    return [new Diagnostic("grammar/invalid-root-id", path, error.message ?? "invalid root id")];
  }
  if (error.keyword === "pattern") {
    const key = (error as ErrorObject & { propertyName?: string }).propertyName;
    if (key !== undefined) {
      return [new Diagnostic("grammar/invalid-key", `${path}/${escapePointer(key)}`, `invalid attribute key ${key}`)];
    }
    const member = path.split("/").at(-1);
    const code =
      member === "id"
        ? "grammar/invalid-id"
        : member === "type"
          ? "grammar/invalid-type"
          : "grammar/invalid-version";
    return [new Diagnostic(code, path, error.message ?? "invalid value")];
  }
  if (error.keyword === "anyOf") {
    return [new Diagnostic("grammar/invalid-attribute-value", path, error.message ?? "invalid attribute value")];
  }
  return [];
}

/** Scans valid JSON text and returns the JSON Pointer of every repeated object member. */
function duplicatePaths(text: string): string[] {
  type Frame = { kind: "object"; path: string; keys: Set<string>; key?: string } | { kind: "array"; path: string; index: number };
  const found: string[] = [];
  const stack: Frame[] = [];
  const childPath = (): string => {
    const top = stack[stack.length - 1];
    if (top === undefined) return "";
    return top.kind === "object" ? `${top.path}/${escapePointer(top.key ?? "")}` : `${top.path}/${top.index}`;
  };
  let expectKey = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === '"') {
      let end = index + 1;
      while (text[end] !== '"') {
        end += text[end] === "\\" ? 2 : 1;
      }
      const top = stack[stack.length - 1];
      if (expectKey && top?.kind === "object") {
        const key = JSON.parse(text.slice(index, end + 1)) as string;
        if (top.keys.has(key)) {
          found.push(`${top.path}/${escapePointer(key)}`);
        }
        top.keys.add(key);
        top.key = key;
        expectKey = false;
      }
      index = end;
    } else if (character === "{") {
      stack.push({ kind: "object", path: childPath(), keys: new Set() });
      expectKey = true;
    } else if (character === "[") {
      stack.push({ kind: "array", path: childPath(), index: 0 });
    } else if (character === "}" || character === "]") {
      stack.pop();
    } else if (character === ",") {
      const top = stack[stack.length - 1];
      if (top?.kind === "object") {
        expectKey = true;
      } else if (top?.kind === "array") {
        top.index += 1;
      }
    }
  }
  return found;
}

// --- model ---------------------------------------------------------------------------------

function buildElement(value: Record<string, any>, at: string): Element {
  const attributes = Object.entries(value.attrs ?? {}).map(([key, item]) => {
    const [category, name] = attributeParts(key);
    return new Attribute(key, category, name, item, `${at}/attrs/${escapePointer(key)}`);
  });
  const children = ((value.children ?? []) as Record<string, any>[]).map((child, index) =>
    buildElement(child, `${at}/children/${index}`),
  );
  return new Element(value.id, value.type, at, attributes, children);
}

// --- contract stage ------------------------------------------------------------------------

function contractDiagnostics(attribute: Attribute, declaration: Declaration, byId: Map<string, Element>): Diagnostic[] {
  if (declaration.valueType === null) {
    return attribute.value === null || typeof attribute.value === "string"
      ? []
      : [wrongType(attribute, "an expression or null")];
  }
  return fits(attribute, attribute.value, declaration.valueType, byId);
}

function fits(attribute: Attribute, value: unknown, valueType: string, byId: Map<string, Element>): Diagnostic[] {
  const match = VALUE_TYPE_PATTERN.exec(valueType);
  const base = match ? match[1] : valueType;
  const argument = match?.[2];
  if (value === null) {
    return [];
  }
  if (base === "list") {
    if (typeof value === "string" && decodeLiteral(value) === undefined) {
      return [];
    }
    if (!Array.isArray(value)) {
      return [wrongType(attribute, valueType)];
    }
    return value.flatMap((item) => fits(attribute, item, argument ?? "", byId));
  }
  if (typeof value === "string") {
    const literal = decodeLiteral(value);
    if (literal === undefined) {
      return []; // a binding or target-language expression
    }
    if (base === "string" || base === "url") {
      return [];
    }
    if (base === "enum") {
      return (argument ?? "").split("|").includes(literal) ? [] : [wrongType(attribute, valueType)];
    }
    if (base === "reference") {
      return reference(attribute, literal, argument, byId);
    }
    return [wrongType(attribute, valueType)];
  }
  if (base === "boolean") {
    return typeof value === "boolean" ? [] : [wrongType(attribute, valueType)];
  }
  if (base === "number" && typeof value === "number") {
    return [];
  }
  if (base === "integer" && typeof value === "number" && Number.isInteger(value)) {
    return [];
  }
  return [wrongType(attribute, valueType)];
}

function reference(
  attribute: Attribute,
  targetId: string,
  argument: string | undefined,
  byId: Map<string, Element>,
): Diagnostic[] {
  const target = byId.get(targetId);
  if (target === undefined) {
    return [new Diagnostic("contract/unresolved-reference", attribute.path, `${attribute.key} names no element: ${targetId}`)];
  }
  if (argument && !argument.split("|").includes(target.type)) {
    return [
      new Diagnostic(
        "contract/wrong-reference-type",
        attribute.path,
        `${attribute.key} names a ${target.type}, not a ${argument.replaceAll("|", " or ")}`,
      ),
    ];
  }
  return [];
}

function wrongType(attribute: Attribute, expected: string): Diagnostic {
  return new Diagnostic(
    "contract/wrong-value-type",
    attribute.path,
    `${attribute.key} must be ${expected}, not ${JSON.stringify(attribute.value)}`,
  );
}

// --- helpers -------------------------------------------------------------------------------

/** Returns the decoded text of a quoted literal string, or undefined for an expression. */
function decodeLiteral(value: string): string | undefined {
  if (value.length < 2 || !value.startsWith('"') || !value.endsWith('"')) {
    return undefined;
  }
  try {
    const decoded: unknown = JSON.parse(value);
    return typeof decoded === "string" ? decoded : undefined;
  } catch {
    return undefined;
  }
}

function attributeParts(key: string): [string | null, string] {
  const [category, ...name] = key.split(".");
  return ["uses", "produces", "behaves"].includes(category) ? [category, name.join(".")] : [null, key];
}

function escapePointer(key: string): string {
  return key.replaceAll("~", "~0").replaceAll("/", "~1");
}
