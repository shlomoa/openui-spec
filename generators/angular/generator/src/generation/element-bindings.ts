import type { DataModelAttributeValue } from "../data-model/attribute-value";
import type { DataModelElement } from "../data-model/element-model";
import { escapeTsString } from "./emit-utils";

/** The Angular template attributes and class members an element's categorized attributes map to. */
export interface ElementBindings {
  /** Template attributes in document order: `[name]="…"` for Uses, `(name)="…"` for Produces and Behaves. */
  attributes: string[];
  /** Empty handler stubs, one per distinct handler a Produces or Behaves expression calls. */
  stubs: string[];
}

const CALL_EXPRESSION = /^([A-Za-z_$][\w$]*)\(([\s\S]*)\)$/;

/**
 * Maps the categorized attributes of {@link element} to Angular, per `GENERATION.md` §
 * Attribute categories in Angular: `uses.x` is the property binding `[x]`, and `produces.x`
 * and `behaves.x` are the event binding `(x)`. Expressions pass through as written. For every
 * Produces or Behaves expression that calls a handler by name, such as `sortOrders($event)`, a
 * stub `protected sortOrders($event: unknown): void {}` is emitted for the hosting component.
 * Plain attributes carry no category and are left to the renderer.
 */
export function buildElementBindings(element: DataModelElement): ElementBindings {
  const attributes: string[] = [];
  const stubs = new Map<string, string>();

  for (const attribute of element.attributes) {
    if (attribute.category === "uses") {
      attributes.push(useBinding(attribute.name, attribute.value));
    } else if (attribute.category === "produces" || attribute.category === "behaves") {
      const handler = attribute.value.kind === "expression" ? attribute.value.source : undefined;
      if (handler === undefined) {
        continue;
      }
      attributes.push(`(${attribute.name})="${escapeAttribute(handler)}"`);
      const stub = handlerStub(handler);
      if (stub && !stubs.has(stub.name)) {
        stubs.set(stub.name, stub.declaration);
      }
    }
  }

  return { attributes, stubs: [...stubs.values()] };
}

function useBinding(name: string, value: DataModelAttributeValue): string {
  return value.kind === "null" ? name : `[${name}]="${escapeAttribute(toTypeScriptExpression(value))}"`;
}

/** Renders a parsed attribute value as a TypeScript expression. */
export function toTypeScriptExpression(value: DataModelAttributeValue): string {
  switch (value.kind) {
    case "null":
      return "null";
    case "literal":
      return `'${escapeTsString(value.text)}'`;
    case "reference":
      return `'${escapeTsString(value.id)}'`;
    case "expression":
      return value.source;
    case "boolean":
    case "integer":
    case "number":
      return String(value.value);
    case "list":
      return `[${value.items.map(toTypeScriptExpression).join(", ")}]`;
  }
}

function handlerStub(expression: string): { name: string; declaration: string } | undefined {
  const call = CALL_EXPRESSION.exec(expression.trim());
  if (!call) {
    return undefined;
  }

  const parameters = splitArguments(call[2]).map((argument, index) =>
    /^\$event$/.test(argument) ? "$event: unknown" : `argument${index + 1}: unknown`,
  );
  return { name: call[1], declaration: `protected ${call[1]}(${parameters.join(", ")}): void {}` };
}

/** Splits call arguments at top-level commas, ignoring commas inside quotes, parentheses, brackets and braces. */
function splitArguments(source: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let quote: string | undefined;
  let current = "";

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      current += character;
      if (character === "\\") {
        current += source[(index += 1)] ?? "";
      } else if (character === quote) {
        quote = undefined;
      }
    } else if (character === "'" || character === '"' || character === "`") {
      quote = character;
      current += character;
    } else if (character === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else {
      depth += "([{".includes(character) ? 1 : ")]}".includes(character) ? -1 : 0;
      current += character;
    }
  }

  return [...parts, current.trim()].filter((part) => part !== "");
}

function escapeAttribute(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
