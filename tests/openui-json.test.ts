import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { OpenUiJson, OpenUiJsonError, OpenUiValidationError } from "../src/index";

function documentWith(childType = "Table"): Record<string, any> {
  return {
    version: "0.0.1",
    id: "root",
    type: "html",
    children: [{ id: "target", type: childType }],
  };
}

test("parses, serializes, saves, and validates with bundled assets", () => {
  const temporaryDirectory = mkdtempSync(path.join(os.tmpdir(), "openui-json-"));
  try {
    const inputPath = path.join(temporaryDirectory, "input.json");
    const outputPath = path.join(temporaryDirectory, "nested", "output.json");
    writeFileSync(inputPath, JSON.stringify(documentWith()), "utf8");

    const document = OpenUiJson.load(inputPath);
    document.validate();
    assert.equal(document.serialize(), `${JSON.stringify(documentWith(), null, 2)}\n`);
    document.save(outputPath);

    assert.deepEqual(JSON.parse(readFileSync(outputPath, "utf8")), documentWith());
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});

test("rejects invalid documents, unsupported types, and duplicate IDs", () => {
  assert.throws(
    () => new OpenUiJson({ id: "root", type: "html" }).validate(),
    OpenUiValidationError,
  );
  assert.throws(
    () => new OpenUiJson(documentWith("Unsupported")).validate(),
    /unsupported object type/,
  );
  assert.throws(
    () =>
      new OpenUiJson({
        ...documentWith(),
        children: [
          { id: "duplicate", type: "Table" },
          { id: "duplicate", type: "Grid" },
        ],
      }).validate(),
    /duplicate object id/,
  );
});

test("adds only valid unique children", () => {
  const document = new OpenUiJson(documentWith());

  assert.throws(() => document.add("missing", { id: "newChild", type: "Table" }), /parent object not found/);
  assert.throws(() => document.add("root", { id: "newChild", type: "Unsupported" }), /unsupported object type/);
  assert.throws(() => document.add("root", { id: "target", type: "Table" }), /object id already exists/);

  document.add("root", { id: "newChild", type: "Table" });
  assert.equal(document.document?.children?.at(-1)?.id, "newChild");
});

test("removes children and root", () => {
  const document = new OpenUiJson(documentWith());
  document.remove("target", { parentId: "root" });
  assert.deepEqual(document.document?.children, []);

  document.remove("root");
  assert.equal(document.document, null);
  assert.throws(() => document.save("unused.json"), /cannot save/);
  assert.throws(() => document.validate(), /root object has been removed/);
});

test("updates attributes and replaces objects", () => {
  const document = new OpenUiJson(documentWith());

  document.updateAttributes("target", { title: "Updated", optional: null });
  document.replace("target", { id: "target", type: "Grid" }, { parentId: "root" });

  assert.deepEqual(document.document?.children, [{ id: "target", type: "Grid" }]);
  document.validate();
});

test("supports mutations for every catalog type", () => {
  const catalog = JSON.parse(
    readFileSync(path.resolve(__dirname, "..", "..", "spec", "openui.json"), "utf8"),
  ) as Record<string, any>;
  const types = new Set<string>();
  const collectTypes = (node: Record<string, any>): void => {
    types.add(node.type);
    for (const child of node.children ?? []) {
      collectTypes(child);
    }
  };
  collectTypes(catalog);

  for (const [index, type] of [...types].entries()) {
    const document = new OpenUiJson(documentWith());
    const id = `object${index}`;
    document.add("root", { id, type });
    document.updateAttributes(id, { title: type });
    document.replace(id, { id, type }, { parentId: "root" });
    document.remove(id, { parentId: "root" });
    document.validate();
  }
});

test("accepts in-memory schema and catalog options", () => {
  const catalog = new OpenUiJson(documentWith()).document!;
  const schema = JSON.parse(
    readFileSync(path.resolve(__dirname, "..", "..", "spec", "openui.schema.json"), "utf8"),
  ) as Record<string, any>;

  OpenUiJson.parse(JSON.stringify(documentWith()), { schema, catalog }).validate();
});

test("accepts custom schema and catalog paths", () => {
  const temporaryDirectory = mkdtempSync(path.join(os.tmpdir(), "openui-json-"));
  try {
    const schemaPath = path.resolve(__dirname, "..", "..", "spec", "openui.schema.json");
    const catalogPath = path.join(temporaryDirectory, "catalog.json");
    writeFileSync(catalogPath, JSON.stringify(documentWith()), "utf8");

    OpenUiJson.parse(JSON.stringify(documentWith()), { schemaPath, catalogPath }).validate();
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});

test("uses OpenUiJsonError for invalid input and mutation failures", () => {
  assert.throws(() => OpenUiJson.parse("not json"), OpenUiJsonError);
  assert.throws(() => OpenUiJson.parse("[]"), /must be an object/);

  const document = new OpenUiJson(documentWith());
  assert.throws(
    () => document.replace("target", { id: "other", type: "Grid" }),
    /replacement object id must match/,
  );
  assert.throws(() => document.remove("root", { parentId: "any" }), /root object has no parent/);
});
