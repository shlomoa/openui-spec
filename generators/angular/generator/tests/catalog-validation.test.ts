import assert from "node:assert/strict";
import { test } from "node:test";

import { createCatalogIndex } from "../src/spec/catalog-index";
import { SpecValidationError } from "../src/spec/diagnostics";
import type { OpenUiDocument } from "../src/spec/openui-spec.types";
import { validateOpenUiSpec } from "../src/spec/validate-spec";

const CATALOG: OpenUiDocument = {
  version: "0.3.0",
  id: "root",
  type: "html",
  children: [{ id: "tableWidget", type: "Table" }],
};

function documentWith(type: string, options: { atRoot?: boolean } = {}): OpenUiDocument {
  if (options.atRoot) {
    return { version: "0.3.0", id: "root", type };
  }

  return {
    version: "0.3.0",
    id: "root",
    type: "html",
    children: [{ id: "target", type }],
  };
}

test("indexes only literal catalog type values", () => {
  const catalog = createCatalogIndex(CATALOG);

  assert.equal(catalog.version, CATALOG.version);
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

test("keeps version grammar separate from catalog compatibility", () => {
  const standaloneDocument = { ...documentWith("Table"), version: "9.8.7" };

  assert.doesNotThrow(() => validateOpenUiSpec(standaloneDocument));
  assert.throws(
    () => validateOpenUiSpec(standaloneDocument, { catalog: CATALOG }),
    /root\.version: Root version '9\.8\.7' does not match catalog version '0\.3\.0'\./,
  );
  assert.throws(
    () => validateOpenUiSpec({ ...standaloneDocument, version: "9.8" }),
    /root\.version: Root version must use "major\.minor\.patch" format\./,
  );
});

test("requires exact catalog membership at the document root", () => {
  const catalog = createCatalogIndex(CATALOG);
  const document = documentWith("WidgetExample", { atRoot: true });

  assert.doesNotThrow(() => validateOpenUiSpec(document));
  assert.throws(
    () => validateOpenUiSpec(document, { catalog }),
    /root\.type: Unknown OpenUI object type 'WidgetExample'\./,
  );
});

test("accepts literal catalog types with flexible ids, attributes, and children", () => {
  const catalog = createCatalogIndex(CATALOG);
  const document: OpenUiDocument = {
    version: "0.3.0",
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
