import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import Ajv2020 from "ajv/dist/2020";
import type { ErrorObject, ValidateFunction } from "ajv";

export type JsonObject = Record<string, any>;

export interface OpenUiDocument {
  version: string;
  id: "root";
  type: string;
  attrs?: Record<string, string | null>;
  children?: OpenUiElement[];
}

export interface OpenUiElement {
  id: string;
  type: string;
  attrs?: Record<string, string | null>;
  children?: OpenUiElement[];
}

export class OpenUiJsonError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OpenUiJsonError";
  }
}

export class OpenUiValidationError extends OpenUiJsonError {
  constructor(message: string) {
    super(message);
    this.name = "OpenUiValidationError";
  }
}

export interface OpenUiJsonOptions {
  schemaPath?: string;
  catalogPath?: string;
  schema?: JsonObject;
  catalog?: JsonObject;
}

export class OpenUiJson {
  public document: JsonObject | null;

  private readonly options: OpenUiJsonOptions;

  constructor(document: JsonObject | null = null, options: OpenUiJsonOptions = {}) {
    this.document = document;
    this.options = options;
  }

  static load(path: string, options: OpenUiJsonOptions = {}): OpenUiJson {
    let document: unknown;
    try {
      document = JSON.parse(readFileSync(path, "utf8"));
    } catch (error) {
      throw new OpenUiJsonError(`cannot load JSON document ${path}: ${errorMessage(error)}`);
    }
    if (!isJsonObject(document)) {
      throw new OpenUiJsonError("an OpenUI JSON document must be an object");
    }
    return new OpenUiJson(document, options);
  }

  static parse(content: string, options: OpenUiJsonOptions = {}): OpenUiJson {
    let document: unknown;
    try {
      document = JSON.parse(content);
    } catch (error) {
      throw new OpenUiJsonError(`cannot parse JSON document: ${errorMessage(error)}`);
    }
    if (!isJsonObject(document)) {
      throw new OpenUiJsonError("an OpenUI JSON document must be an object");
    }
    return new OpenUiJson(document, options);
  }

  save(filePath: string): void {
    if (this.document === null) {
      throw new OpenUiJsonError("cannot save a removed root object");
    }
    mkdirSync(path.dirname(filePath), { recursive: true });
    writeFileSync(filePath, this.serialize(), "utf8");
  }

  serialize(indent = 2): string {
    if (this.document === null) {
      throw new OpenUiJsonError("cannot serialize a removed root object");
    }
    return escapeNonAscii(JSON.stringify(this.document, null, indent)) + "\n";
  }

  validate(): void {
    if (this.document === null) {
      throw new OpenUiValidationError("the root object has been removed");
    }

    const schema = this.loadJson(this.options.schema, this.options.schemaPath, "schema");
    const catalog = this.loadJson(this.options.catalog, this.options.catalogPath, "catalog");
    const validator = this.createValidator(schema, OpenUiValidationError);
    if (!validator(this.document)) {
      throw new OpenUiValidationError(formatValidationErrors(validator.errors));
    }

    const supportedTypes = new Set([...this.walk(catalog)].map((node) => node.type));
    const seenIds = new Set<string>();
    for (const node of this.walk(this.document)) {
      if (seenIds.has(node.id)) {
        throw new OpenUiValidationError(`duplicate object id: ${node.id}`);
      }
      seenIds.add(node.id);
      if (!supportedTypes.has(node.type)) {
        throw new OpenUiValidationError(`unsupported object type: ${node.type}`);
      }
    }
  }

  add(parentId: string, child: JsonObject): void {
    const parent = this.find(parentId);
    if (parent === undefined) {
      throw new OpenUiJsonError(`parent object not found: ${parentId}`);
    }
    const candidate = structuredClone(child);
    this.validateChild(candidate);
    const existingIds = new Set([...this.walk(this.document as JsonObject)].map((node) => node.id));
    const duplicateId = [...this.walk(candidate)].map((node) => node.id).find((id) => existingIds.has(id));
    if (duplicateId !== undefined) {
      throw new OpenUiJsonError(`object id already exists: ${duplicateId}`);
    }
    (parent.children ??= []).push(candidate);
  }

  remove(objectId: string, options: { parentId?: string } = {}): void {
    if (this.document === null) {
      throw new OpenUiJsonError("the root object has already been removed");
    }
    if (this.document.id === objectId) {
      if (options.parentId !== undefined) {
        throw new OpenUiJsonError("the root object has no parent");
      }
      this.document = null;
      return;
    }

    const parent = this.findParent(objectId);
    if (parent === undefined) {
      throw new OpenUiJsonError(`object not found: ${objectId}`);
    }
    if (options.parentId !== undefined && parent.node.id !== options.parentId) {
      throw new OpenUiJsonError(`object ${objectId} does not belong to parent ${options.parentId}`);
    }
    parent.node.children?.splice(parent.index, 1);
  }

  replace(
    objectId: string,
    replacement: JsonObject,
    options: { parentId?: string } = {},
  ): void {
    const candidate = structuredClone(replacement);
    this.validateChild(candidate);
    if (candidate.id !== objectId) {
      throw new OpenUiJsonError("replacement object id must match the replaced object id");
    }
    if (this.document !== null && this.document.id === objectId) {
      if (options.parentId !== undefined) {
        throw new OpenUiJsonError("the root object has no parent");
      }
      this.document = candidate;
      return;
    }

    const parent = this.findParent(objectId);
    if (parent === undefined) {
      throw new OpenUiJsonError(`object not found: ${objectId}`);
    }
    if (options.parentId !== undefined && parent.node.id !== options.parentId) {
      throw new OpenUiJsonError(`object ${objectId} does not belong to parent ${options.parentId}`);
    }
    parent.node.children![parent.index] = candidate;
  }

  updateAttributes(objectId: string, attributes: Record<string, string | null>): void {
    const node = this.find(objectId);
    if (node === undefined) {
      throw new OpenUiJsonError(`object not found: ${objectId}`);
    }
    if (
      !Object.entries(attributes).every(
        ([key, value]) => typeof key === "string" && (value === null || typeof value === "string"),
      )
    ) {
      throw new OpenUiJsonError("attribute changes must map strings to strings or null");
    }
    const updated = structuredClone(node);
    if (!Object.hasOwn(updated, "attrs")) {
      updated.attrs = {};
    }
    Object.assign(updated.attrs as JsonObject, attributes);
    this.validateNode(updated, node === this.document);
    node.attrs = updated.attrs;
  }

  private validateChild(child: JsonObject): void {
    this.validateNode(child, false);
    const catalog = this.loadJson(this.options.catalog, this.options.catalogPath, "catalog");
    const supportedTypes = new Set([...this.walk(catalog)].map((node) => node.type));
    const seenIds = new Set<string>();
    for (const node of this.walk(child)) {
      if (seenIds.has(node.id)) {
        throw new OpenUiJsonError(`duplicate object id: ${node.id}`);
      }
      seenIds.add(node.id);
      if (!supportedTypes.has(node.type)) {
        throw new OpenUiJsonError(`unsupported object type: ${node.type}`);
      }
    }
  }

  private validateNode(node: JsonObject, isRoot: boolean): void {
    const schema = this.loadJson(this.options.schema, this.options.schemaPath, "schema");
    const definition = isRoot ? schema : { $ref: "#/$defs/element", $defs: schema.$defs };
    const validator = this.createValidator(definition, OpenUiJsonError);
    if (!validator(node)) {
      throw new OpenUiJsonError(formatValidationErrors(validator.errors));
    }
  }

  private find(objectId: string): JsonObject | undefined {
    if (this.document === null) {
      return undefined;
    }
    return [...this.walk(this.document)].find((node) => node.id === objectId);
  }

  private findParent(objectId: string): { node: JsonObject; index: number } | undefined {
    if (this.document === null) {
      return undefined;
    }
    for (const node of this.walk(this.document)) {
      const index = node.children?.findIndex((child: JsonObject) => child.id === objectId) ?? -1;
      if (index >= 0) {
        return { node, index };
      }
    }
    return undefined;
  }

  private *walk(node: JsonObject): Generator<JsonObject> {
    yield node;
    for (const child of node.children ?? []) {
      yield* this.walk(child);
    }
  }

  private loadJson(value: JsonObject | undefined, filePath: string | undefined, name: string): JsonObject {
    if (value !== undefined) {
      if (!isJsonObject(value)) {
        throw new OpenUiValidationError(`OpenUI ${name} must be an object`);
      }
      return value;
    }
    const resolvedPath = filePath ?? path.resolve(__dirname, "..", "..", "spec", `openui${name === "schema" ? ".schema" : ""}.json`);
    try {
      const parsed: unknown = JSON.parse(readFileSync(resolvedPath, "utf8"));
      if (!isJsonObject(parsed)) {
        throw new OpenUiValidationError(`OpenUI ${name} must be an object`);
      }
      return parsed;
    } catch (error) {
      if (error instanceof OpenUiValidationError) {
        throw error;
      }
      throw new OpenUiValidationError(`cannot load ${name} ${resolvedPath}: ${errorMessage(error)}`);
    }
  }

  private createValidator(
    schema: JsonObject,
    ErrorType: typeof OpenUiJsonError,
  ): ValidateFunction {
    try {
      return new Ajv2020({ allErrors: true, strict: false }).compile(schema);
    } catch (error) {
      throw new ErrorType(`invalid OpenUI schema: ${errorMessage(error)}`);
    }
  }
}

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function formatValidationErrors(errors: ErrorObject[] | null | undefined): string {
  return [...(errors ?? [])]
    .sort((left, right) => left.instancePath.localeCompare(right.instancePath))
    .map((error) => `${jsonPath(error.instancePath)}: ${error.message}`)
    .join("\n");
}

function jsonPath(instancePath: string): string {
  return instancePath === "" ? "$" : `$.${instancePath.split("/").filter(Boolean).join(".")}`;
}

function escapeNonAscii(value: string): string {
  return value.replace(/[\u007f-\uffff]/g, (character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`);
}
