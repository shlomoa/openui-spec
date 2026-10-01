import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";

import { SpecValidationError, type Diagnostic } from "../src/spec/diagnostics";
import { createCatalogIndex } from "../src/spec/catalog-index";
import type { OpenUiDocument } from "../src/spec/openui-spec.types";
import { validateOpenUiGeneratorInput, validateOpenUiSpec } from "../src/spec/validate-spec";

const GENERATOR_ROOT =
  path.basename(path.dirname(__dirname)) === "dist" ? path.resolve(__dirname, "..", "..") : path.resolve(__dirname, "..");
const SPEC_ROOT = path.join(GENERATOR_ROOT, "..", "..", "..", "spec");
const CONFORMANCE_ROOT = path.join(SPEC_ROOT, "conformance");
const EXPECTED_SUFFIX = ".expected.json";

// The grammar diagnostic of a document whose text is not JSON: loadOpenUiDocument's JSON.parse
// rejects it before the input check runs.
const JSON_SYNTAX = "grammar/json-syntax";
// The grammar diagnostic of a repeated object member: a decoded value does not carry it, and
// the input check receives a decoded document, so the generator does not detect it.
const DUPLICATE_MEMBER = "grammar/duplicate-member";

interface ExpectedDiagnostic {
  code: string;
  path: string;
}

function conformanceFiles(kind: "valid" | "invalid"): string[] {
  const directory = path.join(CONFORMANCE_ROOT, kind);
  return readdirSync(directory)
    .filter((name) => name.endsWith(".json") && !name.endsWith(EXPECTED_SUFFIX))
    .sort()
    .map((name) => path.join(directory, name));
}

function expectedDiagnostics(file: string): ExpectedDiagnostic[] {
  return JSON.parse(readFileSync(file.replace(/\.json$/, EXPECTED_SUFFIX), "utf8")).diagnostics;
}

function pairs(diagnostics: ExpectedDiagnostic[] | Diagnostic[]): string[] {
  return diagnostics.map((diagnostic) => `${diagnostic.code} ${diagnostic.path}`).sort();
}

function grammarCases(): { file: string; expected: ExpectedDiagnostic[] }[] {
  return conformanceFiles("invalid")
    .map((file) => ({ file, expected: expectedDiagnostics(file) }))
    .filter(({ expected }) => expected.some((diagnostic) => diagnostic.code.startsWith("grammar/")));
}

test("the input check accepts every valid conformance document", () => {
  const catalog = createCatalogIndex(JSON.parse(readFileSync(path.join(SPEC_ROOT, "openui.json"), "utf8")) as OpenUiDocument);
  const files = conformanceFiles("valid");
  assert.ok(files.length > 0);
  for (const file of files) {
    const document = JSON.parse(readFileSync(file, "utf8")) as OpenUiDocument;
    assert.doesNotThrow(() => validateOpenUiSpec(document), path.basename(file));
    assert.doesNotThrow(() => validateOpenUiGeneratorInput(document, catalog), path.basename(file));
  }
});

test("the input check rejects every conformance document the grammar stage rejects, with its code and path", () => {
  const cases = grammarCases();
  assert.ok(cases.length > 0);

  for (const { file, expected } of cases) {
    const name = path.basename(file);
    const text = readFileSync(file, "utf8");
    const codes = expected.map((diagnostic) => diagnostic.code);

    if (codes.includes(JSON_SYNTAX)) {
      assert.throws(() => JSON.parse(text), name);
      continue;
    }
    if (codes.includes(DUPLICATE_MEMBER)) {
      // Documented gap: see GENERATION.md, "Input check".
      continue;
    }

    const document = JSON.parse(text) as OpenUiDocument;
    assert.throws(
      () => validateOpenUiSpec(document),
      (error: unknown) => {
        assert.ok(error instanceof SpecValidationError, name);
        assert.deepEqual(pairs(error.diagnostics), pairs(expected), name);
        return true;
      },
      name,
    );
  }
});

test("the input check rejects the document-stage and catalog-stage conformance cases it implements", () => {
  const catalog = createCatalogIndex(JSON.parse(readFileSync(path.join(SPEC_ROOT, "openui.json"), "utf8")) as OpenUiDocument);
  const implemented = new Set(["document/duplicate-id", "document/unsupported-version", "catalog/unknown-type"]);

  const cases = conformanceFiles("invalid")
    .map((file) => ({ file, expected: expectedDiagnostics(file) }))
    .filter(({ expected }) => expected.every((diagnostic) => implemented.has(diagnostic.code)));
  assert.ok(cases.length >= implemented.size);

  for (const { file, expected } of cases) {
    const name = path.basename(file);
    const document = JSON.parse(readFileSync(file, "utf8")) as OpenUiDocument;
    assert.throws(
      () => validateOpenUiGeneratorInput(document, catalog),
      (error: unknown) => {
        assert.ok(error instanceof SpecValidationError, name);
        assert.deepEqual(pairs(error.diagnostics), pairs(expected), name);
        return true;
      },
      name,
    );
  }
});
