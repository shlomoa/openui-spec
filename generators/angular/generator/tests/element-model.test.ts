import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

import { parseAttributeValue } from "../src/data-model/attribute-value";
import { buildDataModel } from "../src/data-model/build-data-model";
import { buildElementTree, findAttribute, splitAttributeKey } from "../src/data-model/element-model";

const ANGULAR_GENERATOR_ROOT =
  path.basename(path.dirname(__dirname)) === "dist"
    ? path.resolve(__dirname, "..", "..")
    : path.resolve(__dirname, "..");
const TABLE_FIXTURE = path.join(
  ANGULAR_GENERATOR_ROOT,
  "tests",
  "fixtures",
  "table",
  "input_table",
  "table.example.json",
);

test("parses null, quoted literals, expressions and lists", () => {
  assert.deepEqual(parseAttributeValue(null), { kind: "null" });
  assert.deepEqual(parseAttributeValue('"Details"'), { kind: "literal", text: "Details" });
  assert.deepEqual(parseAttributeValue('"say \\"hi\\""'), { kind: "literal", text: 'say "hi"' });
  assert.deepEqual(parseAttributeValue("sortOrders($event)"), { kind: "expression", source: "sortOrders($event)" });
  assert.deepEqual(parseAttributeValue("null"), { kind: "expression", source: "null" });
  assert.deepEqual(parseAttributeValue(['"a"', "b", null]), {
    kind: "list",
    items: [{ kind: "literal", text: "a" }, { kind: "expression", source: "b" }, { kind: "null" }],
  });
});

test("reads unquoted values by their declared value type", () => {
  assert.deepEqual(parseAttributeValue("true", "boolean"), { kind: "boolean", value: true });
  assert.deepEqual(parseAttributeValue("25", "integer"), { kind: "integer", value: 25 });
  assert.deepEqual(parseAttributeValue("0.5", "number"), { kind: "number", value: 0.5 });
  assert.deepEqual(parseAttributeValue('"dashboardRoute"', "reference(Route)"), {
    kind: "reference",
    id: "dashboardRoute",
  });
  assert.deepEqual(parseAttributeValue(["1", "2"], "list(integer)"), {
    kind: "list",
    items: [
      { kind: "integer", value: 1 },
      { kind: "integer", value: 2 },
    ],
  });
});

test("keeps a value that does not fit its declared type as written", () => {
  assert.deepEqual(parseAttributeValue("isOpen", "boolean"), { kind: "expression", source: "isOpen" });
  assert.deepEqual(parseAttributeValue("(int)x", "integer"), { kind: "expression", source: "(int)x" });
  assert.deepEqual(parseAttributeValue('"yes"', "boolean"), { kind: "literal", text: "yes" });
});

test("splits attribute keys into category and name", () => {
  assert.deepEqual(splitAttributeKey("uses.label"), { category: "uses", name: "label" });
  assert.deepEqual(splitAttributeKey("produces.activate"), { category: "produces", name: "activate" });
  assert.deepEqual(splitAttributeKey("behaves.sort"), { category: "behaves", name: "sort" });
  assert.deepEqual(splitAttributeKey("title"), { category: "plain", name: "title" });
});

test("builds the element tree of a concrete document in document order", async () => {
  const fixture = JSON.parse(await readFile(TABLE_FIXTURE, "utf8"));
  const tree = buildElementTree(fixture);

  assert.equal(tree.type, "Table");
  assert.deepEqual(findAttribute(tree, "plain", "title")?.value, { kind: "literal", text: "Table example" });

  const table = tree.children[0];
  assert.deepEqual(
    table.attributes.map((attribute) => [attribute.category, attribute.name]),
    [
      ["behaves", "sort"],
      ["behaves", "filter"],
      ["behaves", "paginate"],
    ],
  );
  assert.deepEqual(findAttribute(table, "behaves", "sort")?.value, {
    kind: "expression",
    source: "sortOrders($event)",
  });
  assert.deepEqual(
    table.children.map((child) => child.type),
    ["caption", "thead", "tr"],
  );
});

test("concrete-input pages carry the element tree of their root element", async () => {
  const fixture = JSON.parse(await readFile(TABLE_FIXTURE, "utf8"));
  const model = buildDataModel(fixture);

  assert.equal(model.pages.length, 1);
  assert.equal(model.pages[0].element?.id, "ordersTable");
  assert.equal(model.pages[0].element?.type, "table");
});
