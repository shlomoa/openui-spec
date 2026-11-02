import assert from "node:assert/strict";
import { test } from "node:test";

import { createCatalogIndex } from "../src/spec/catalog-index";
import { SpecValidationError } from "../src/spec/diagnostics";
import type { OpenUiDocument } from "../src/spec/openui-spec.types";
import { validateOpenUiSpec } from "../src/spec/validate-spec";

const CATALOG: OpenUiDocument = {
  id: "root",
  type: "html",
  children: [{ id: "tableWidget", type: "Table" }],
};

function documentWith(type: string, options: { atRoot?: boolean } = {}): OpenUiDocument {
  if (options.atRoot) {
    return { id: "root", type };
  }

  return {
    id: "root",
    type: "html",
    children: [{ id: "target", type }],
  };
}

test("indexes only literal catalog type values", () => {
  const catalog = createCatalogIndex(CATALOG);

  assert.equal(catalog.hasType("html"), true);
  assert.equal(catalog.hasType("Table"), true);
  assert.equal(catalog.hasType("TableWidget"), false);
  assert.equal(catalog.hasType("Column"), false);
});

test("keeps grammar validation separate from catalog membership", () => {
  const catalog = createCatalogIndex(CATALOG);

  for (const type of ["WidgetExample", "Column", "mat-datetime-picker", "button"]) {
    const document = documentWith(type);
    assert.doesNotThrow(() => validateOpenUiSpec(document));
    assert.throws(
      () => validateOpenUiSpec(document, { catalog }),
      (error: unknown) => {
        assert.ok(error instanceof SpecValidationError);
        assert.match(error.message, new RegExp(`Unknown OpenUI object type '${type}'`));
        return true;
      },
    );
  }
});

test("rejects a root version member", () => {
  assert.throws(
    () => validateOpenUiSpec(JSON.parse(JSON.stringify({ ...documentWith("Table"), version: "9.8.7" }))),
    /\/version: grammar\/unknown-property: Unknown member 'version'; put non-structural data under attrs\./,
  );
});

test("requires exact catalog membership at the document root", () => {
  const catalog = createCatalogIndex(CATALOG);
  const document = documentWith("WidgetExample", { atRoot: true });

  assert.doesNotThrow(() => validateOpenUiSpec(document));
  assert.throws(
    () => validateOpenUiSpec(document, { catalog }),
    /\/type: catalog\/unknown-type: Unknown OpenUI object type 'WidgetExample'\./,
  );
});

test("accepts literal catalog types with flexible ids, attributes, and children", () => {
  const catalog = createCatalogIndex(CATALOG);
  const document: OpenUiDocument = {
    id: "root",
    type: "html",
    children: [
      {
        id: "ordersTable",
        type: "Table",
        attrs: { source: "orders", optional: null },
        children: [{ id: "nestedTable", type: "Table" }],
      },
    ],
  };

  assert.doesNotThrow(() => validateOpenUiSpec(document, { catalog }));
});
