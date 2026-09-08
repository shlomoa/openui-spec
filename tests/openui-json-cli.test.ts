import assert from "node:assert/strict";
import { spawnSync, type SpawnSyncReturns } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

function documentWith(): Record<string, any> {
  return {
    version: "0.0.1",
    id: "root",
    type: "html",
    children: [{ id: "target", type: "Table" }],
  };
}

function run(...arguments_: string[]): SpawnSyncReturns<string> {
  return spawnSync(process.execPath, [path.resolve(__dirname, "..", "src", "cli.js"), ...arguments_], {
    cwd: path.resolve(__dirname, "..", ".."),
    encoding: "utf8",
  });
}

test("validates and applies each CLI change command", () => {
  const temporaryDirectory = mkdtempSync(path.join(os.tmpdir(), "openui-json-cli-"));
  try {
    const inputPath = path.join(temporaryDirectory, "input.json");
    const objectPath = path.join(temporaryDirectory, "object.json");
    writeFileSync(inputPath, JSON.stringify(documentWith()), "utf8");
    writeFileSync(objectPath, '{"id":"added","type":"Grid"}', "utf8");

    assert.equal(run("validate", `--input=${inputPath}`).status, 0);
    assert.equal(
      run("add", "--input", inputPath, "--parent", "root", "--object", objectPath).status,
      0,
    );
    assert.equal(
      run("modify", "--input", inputPath, "--id", "added", "--attrs", '{"title":"Added"}').status,
      0,
    );
    assert.equal(run("remove", "--input", inputPath, "--id", "added").status, 0);
    assert.deepEqual(JSON.parse(readFileSync(inputPath, "utf8")), documentWith());
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});

test("writes changes to an optional output path", () => {
  const temporaryDirectory = mkdtempSync(path.join(os.tmpdir(), "openui-json-cli-"));
  try {
    const inputPath = path.join(temporaryDirectory, "input.json");
    const outputPath = path.join(temporaryDirectory, "nested", "output.json");
    writeFileSync(inputPath, JSON.stringify(documentWith()), "utf8");

    const result = run(
      "add",
      "--input",
      inputPath,
      "--output",
      outputPath,
      "--parent",
      "root",
      "--object",
      '{"id":"added","type":"Grid"}',
    );

    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(JSON.parse(readFileSync(inputPath, "utf8")), documentWith());
    assert.equal(JSON.parse(readFileSync(outputPath, "utf8")).children.at(-1).id, "added");
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});

test("reports argument and document errors without a stack trace", () => {
  const temporaryDirectory = mkdtempSync(path.join(os.tmpdir(), "openui-json-cli-"));
  try {
    const inputPath = path.join(temporaryDirectory, "input.json");
    writeFileSync(inputPath, JSON.stringify(documentWith()), "utf8");

    const invalidJson = run("add", "--input", inputPath, "--parent", "root", "--object", "{not json}");
    assert.equal(invalidJson.status, 2);
    assert.match(invalidJson.stderr, /invalid JSON/);

    const missingParent = run(
      "add",
      "--input",
      inputPath,
      "--parent",
      "missing",
      "--object",
      '{"id":"added","type":"Grid"}',
    );
    assert.equal(missingParent.status, 1);
    assert.match(missingParent.stderr, /error: parent object not found/);
    assert.doesNotMatch(missingParent.stderr, /Traceback|\n\s+at\s/);
    assert.deepEqual(JSON.parse(readFileSync(inputPath, "utf8")), documentWith());
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
});
