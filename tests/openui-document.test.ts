import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  Catalog,
  Diagnostic,
  OpenUiParseError,
  defaultCatalog,
  parse,
  validate,
  validateText,
} from "../src/index";

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const CONFORMANCE_DIR = path.join(REPO_ROOT, "spec", "conformance");
const EXAMPLES_DIR = path.join(REPO_ROOT, "spec", "examples");
const EXPECTED_SUFFIX = ".expected.json";

function pairs(diagnostics: Diagnostic[]): string[] {
  return diagnostics.map((diagnostic) => `${diagnostic.code} ${diagnostic.path}`).sort();
}

function jsonFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(directory, entry.name);
      return entry.isDirectory() ? jsonFiles(fullPath) : entry.name.endsWith(".json") ? [fullPath] : [];
    })
    .sort();
}

test("valid conformance documents have no diagnostics", () => {
  for (const file of jsonFiles(path.join(CONFORMANCE_DIR, "valid"))) {
    assert.deepEqual(pairs(validateText(readFileSync(file, "utf8"))), [], path.basename(file));
  }
});

test("invalid conformance documents report exactly the expected diagnostics", () => {
  const documents = jsonFiles(path.join(CONFORMANCE_DIR, "invalid")).filter((file) => !file.endsWith(EXPECTED_SUFFIX));
  assert.ok(documents.length > 0);
  for (const file of documents) {
    const expected = JSON.parse(readFileSync(file.replace(/\.json$/, EXPECTED_SUFFIX), "utf8")).diagnostics as {
      code: string;
      path: string;
    }[];
    assert.deepEqual(
      pairs(validateText(readFileSync(file, "utf8"))),
      expected.map((item) => `${item.code} ${item.path}`).sort(),
      path.basename(file),
    );
  }
});

test("parse builds the typed tree", () => {
  const document = parse(
    JSON.stringify({
      id: "root",
      version: defaultCatalog().version,
      type: "html",
      children: [
        {
          id: "confirmDialog",
          type: "Dialog",
          attrs: { "uses.open": "isOpen", "uses.modal": "true", title: '"Confirm"' },
        },
      ],
    }),
  );
  const dialog = document.root.children[0];
  assert.deepEqual(
    document.elements().map((element) => element.id),
    ["root", "confirmDialog"],
  );
  assert.equal(dialog.path, "/children/0");
  const open = dialog.attribute("uses.open");
  assert.deepEqual([open?.category, open?.name, open?.isExpression], ["uses", "open", true]);
  const modal = dialog.attribute("uses.modal");
  assert.deepEqual([modal?.literal, modal?.isExpression], [null, true]);
  const title = dialog.attribute("title");
  assert.deepEqual([title?.category, title?.literal, title?.isExpression], [null, "Confirm", false]);
  assert.equal(dialog.attribute("missing"), undefined);
});

test("parse throws with grammar diagnostics", () => {
  assert.throws(
    () => parse('{"id": "root", "type": "html"}'),
    (error: unknown) =>
      error instanceof OpenUiParseError && pairs(error.diagnostics).join() === "grammar/missing-property /version",
  );
});

test("catalog contracts cover scope and instance types", () => {
  const catalog = defaultCatalog();
  assert.deepEqual(catalog.contracts.get("dialog"), catalog.contracts.get("Dialog"));
  assert.equal(catalog.contracts.get("NavItem")?.get("route")?.valueType, "reference(Route)");
  assert.equal(catalog.contracts.get("Report")?.get("sort")?.valueType, null);
});

test("the catalog and every worked example validate", () => {
  for (const file of [path.join(REPO_ROOT, "spec", "openui.json"), ...jsonFiles(EXAMPLES_DIR)]) {
    assert.deepEqual(validateText(readFileSync(file, "utf8")).map(String), [], path.relative(REPO_ROOT, file));
  }
});

test("a custom catalog sets the supported version", () => {
  const catalog = Catalog.fromValue({ id: "root", version: "9.9.9", type: "html" });
  assert.deepEqual(validate(parse('{"id": "root", "version": "9.9.9", "type": "html"}'), catalog), []);
});
