import type { OpenUiAttributeScalar, OpenUiAttributeValue } from "../spec/openui-spec.types";

/**
 * A parsed OpenUI attribute value (spec `README.md` §§ 4.5–4.7).
 *
 * - `null`: the attribute is present without a value.
 * - `literal`: a quoted string, decoded (`"\"Details\""` is the text `Details`).
 * - `expression`: an unquoted binding or target-language expression, kept verbatim.
 *   The specification does not execute it; a generator decides how to emit it.
 * - `boolean`, `integer`, `number`: an unquoted value that the declared value type
 *   reads as a typed literal (`"true"`, `"25"`, `"0.5"`). Without a declared type, or when
 *   the text does not fit, the value stays an `expression`.
 * - `reference`: a quoted literal naming another element, for a declared `reference` type.
 * - `list`: a JSON list of the values above.
 */
export type DataModelAttributeValue =
  | { kind: "null" }
  | { kind: "literal"; text: string }
  | { kind: "expression"; source: string }
  | { kind: "boolean"; value: boolean }
  | { kind: "integer"; value: number }
  | { kind: "number"; value: number }
  | { kind: "reference"; id: string }
  | { kind: "list"; items: DataModelAttributeValue[] };

const QUOTED_LITERAL = /^"(?:[^"\\]|\\.)*"$/;
const INTEGER_TEXT = /^-?\d+$/;
const NUMBER_TEXT = /^-?\d+(?:\.\d+)?$/;
const VALUE_TYPE = /^([a-z]+)(?:\((.*)\))?$/s;

/**
 * Parses a raw `attrs` value. The optional {@link valueType} is the declared value type of a
 * Uses attribute (spec `README.md` § 4.6, the `value_type` production, e.g. `boolean`,
 * `reference(Route)` or `list(integer)`); it only refines how a value is read, and a value
 * that does not fit it is kept as written rather than rejected, because validation is the
 * contract stage's job.
 */
export function parseAttributeValue(value: OpenUiAttributeValue, valueType?: string): DataModelAttributeValue {
  if (Array.isArray(value)) {
    const itemType = listItemType(valueType);
    return { kind: "list", items: value.map((item) => parseScalar(item, itemType)) };
  }

  return parseScalar(value, valueType);
}

function parseScalar(value: OpenUiAttributeScalar, valueType: string | undefined): DataModelAttributeValue {
  if (value === null) {
    return { kind: "null" };
  }

  if (QUOTED_LITERAL.test(value)) {
    const text = decodeLiteral(value);
    return valueTypeName(valueType) === "reference" ? { kind: "reference", id: text } : { kind: "literal", text };
  }

  switch (valueTypeName(valueType)) {
    case "boolean":
      if (value === "true" || value === "false") {
        return { kind: "boolean", value: value === "true" };
      }
      break;
    case "integer":
      if (INTEGER_TEXT.test(value)) {
        return { kind: "integer", value: Number(value) };
      }
      break;
    case "number":
      if (NUMBER_TEXT.test(value)) {
        return { kind: "number", value: Number(value) };
      }
      break;
  }

  return { kind: "expression", source: value };
}

function decodeLiteral(quoted: string): string {
  try {
    return JSON.parse(quoted) as string;
  } catch {
    return quoted.slice(1, -1);
  }
}

function valueTypeName(valueType: string | undefined): string | undefined {
  return valueType?.match(VALUE_TYPE)?.[1];
}

function listItemType(valueType: string | undefined): string | undefined {
  const match = valueType?.match(VALUE_TYPE);
  return match?.[1] === "list" ? match[2] : undefined;
}
