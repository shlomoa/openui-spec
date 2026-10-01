import { readFileSync } from "node:fs";
import path from "node:path";

import Ajv2020, { type ErrorObject, type ValidateFunction } from "ajv/dist/2020";

import type { Diagnostic } from "./diagnostics";

const SCHEMA_FILE = path.join("spec", "openui.schema.json");

let schemaValidator: ValidateFunction | undefined;

/**
 * Returns the grammar-stage diagnostics of a decoded JSON value.
 *
 * Every rule of the document grammar comes from `spec/openui.schema.json`, the JSON Schema
 * projection of `spec/EBNF.txt`. This module holds no member list or pattern of the grammar,
 * only the mapping from a schema keyword to a diagnostic code, which is the mapping of the
 * grammar diagnostic provenance in `spec/conformance/README.md`.
 */
export function grammarDiagnostics(value: unknown): Diagnostic[] {
  const validator = getSchemaValidator();
  if (validator(value)) {
    return [];
  }

  const errors = validator.errors ?? [];
  const anyOfPaths = new Set(errors.filter((error) => error.keyword === "anyOf").map((error) => error.instancePath));
  return errors.flatMap((error) =>
    error.keyword !== "anyOf" &&
    [...anyOfPaths].some((anyOfPath) => error.instancePath === anyOfPath || error.instancePath.startsWith(`${anyOfPath}/`))
      ? []
      : errorDiagnostics(error),
  );
}

/** Escapes one reference token of a JSON Pointer (RFC 6901). */
function escapePointer(token: string): string {
  return token.replaceAll("~", "~0").replaceAll("/", "~1");
}

function getSchemaValidator(): ValidateFunction {
  if (!schemaValidator) {
    const schema = JSON.parse(readFileSync(findSchemaPath(), "utf8")) as object;
    schemaValidator = new Ajv2020({ allErrors: true, strict: false }).compile(schema);
  }
  return schemaValidator;
}

/** Walks up from this module to the repository's `spec/openui.schema.json`. */
function findSchemaPath(): string {
  let directory = __dirname;
  while (true) {
    const candidate = path.join(directory, SCHEMA_FILE);
    try {
      readFileSync(candidate);
      return candidate;
    } catch {
      const parent = path.dirname(directory);
      if (parent === directory) {
        throw new Error(`Could not find ${SCHEMA_FILE} from ${__dirname}.`);
      }
      directory = parent;
    }
  }
}

function errorDiagnostics(error: ErrorObject): Diagnostic[] {
  const pointer = error.instancePath;
  if (error.schemaPath.includes("/anyOf/") || error.keyword === "propertyNames") {
    return [];
  }

  switch (error.keyword) {
    case "additionalProperties": {
      const key = (error.params as { additionalProperty: string }).additionalProperty;
      return [{ code: "grammar/unknown-property", path: `${pointer}/${escapePointer(key)}`, message: `Unknown member '${key}'; put non-structural data under attrs.` }];
    }
    case "required": {
      const key = (error.params as { missingProperty: string }).missingProperty;
      return [{ code: "grammar/missing-property", path: `${pointer}/${escapePointer(key)}`, message: `Missing required member '${key}'.` }];
    }
    case "type":
      return [{ code: "grammar/invalid-member-type", path: pointer, message: error.message ?? "Invalid JSON type." }];
    case "const":
      return [{ code: "grammar/invalid-root-id", path: pointer, message: error.message ?? "Invalid root id." }];
    case "pattern": {
      const key = (error as ErrorObject & { propertyName?: string }).propertyName;
      if (key !== undefined) {
        return [{ code: "grammar/invalid-key", path: `${pointer}/${escapePointer(key)}`, message: `Invalid attribute key '${key}'.` }];
      }
      const member = pointer.split("/").at(-1);
      const code = member === "id" ? "grammar/invalid-id" : member === "type" ? "grammar/invalid-type" : "grammar/invalid-version";
      return [{ code, path: pointer, message: error.message ?? "Invalid value." }];
    }
    case "anyOf":
      return [{ code: "grammar/invalid-attribute-value", path: pointer, message: "Attribute values must be strings, null, or lists of these." }];
    default:
      return [];
  }
}
