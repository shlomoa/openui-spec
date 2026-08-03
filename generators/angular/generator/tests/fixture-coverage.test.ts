import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const ANGULAR_GENERATOR_ROOT =
  path.basename(path.dirname(__dirname)) === "dist"
    ? path.resolve(__dirname, "..", "..")
    : path.resolve(__dirname, "..");
const REPOSITORY_ROOT = path.resolve(ANGULAR_GENERATOR_ROOT, "..", "..", "..");
const SPEC_EXAMPLES_ROOT = path.join(REPOSITORY_ROOT, "spec", "examples");
const FIXTURES_ROOT = path.join(ANGULAR_GENERATOR_ROOT, "tests", "fixtures");
const EXPANDED_OPENUI_FIXTURE = path.join(FIXTURES_ROOT, "expanded-openui.json");

async function findExampleFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return findExampleFiles(fullPath);
      }
      return entry.isFile() && entry.name.endsWith(".example.json") ? [fullPath] : [];
    }),
  );

  return files.flat().sort();
}

function fixtureNameForExample(examplePath: string): string {
  const relativeParts = path.relative(SPEC_EXAMPLES_ROOT, examplePath).split(path.sep);
  const fileName = relativeParts[relativeParts.length - 1];
  const stem = fileName.replace(/\.example\.json$/, "");

  if (stem === "scope") {
    if (relativeParts.length === 1) {
      return "scope";
    }

    return `${relativeParts[relativeParts.length - 2].toLowerCase()}_scope`;
  }

  return stem;
}

async function pathExists(candidate: string): Promise<boolean> {
  try {
    await access(candidate);
    return true;
  } catch {
    return false;
  }
}

test("every spec example has a mirrored Angular generator fixture pair", async () => {
  const exampleFiles = await findExampleFiles(SPEC_EXAMPLES_ROOT);
  assert.ok(exampleFiles.length > 0, "Expected spec/examples to contain example JSON files.");

  const seenFixtureNames = new Map<string, string>();
  for (const examplePath of exampleFiles) {
    const fixtureName = fixtureNameForExample(examplePath);
    const previous = seenFixtureNames.get(fixtureName);
    assert.equal(
      previous,
      undefined,
      `Fixture name '${fixtureName}' is shared by ${previous} and ${path.relative(REPOSITORY_ROOT, examplePath)}.`,
    );
    seenFixtureNames.set(fixtureName, path.relative(REPOSITORY_ROOT, examplePath));

    const source = JSON.parse(await readFile(examplePath, "utf8"));
    const inputCopy = path.join(FIXTURES_ROOT, fixtureName, `input_${fixtureName}`, path.basename(examplePath));
    const outputDirectory = path.join(FIXTURES_ROOT, fixtureName, `output_${fixtureName}`);

    assert.ok(await pathExists(inputCopy), `Missing fixture input copy for ${path.relative(REPOSITORY_ROOT, examplePath)}.`);
    assert.ok(await pathExists(outputDirectory), `Missing fixture output directory for ${fixtureName}.`);

    const fixture = JSON.parse(await readFile(inputCopy, "utf8"));
    assert.deepEqual(
      fixture,
      source,
      `${path.relative(REPOSITORY_ROOT, inputCopy)} must mirror ${path.relative(REPOSITORY_ROOT, examplePath)}.`,
    );
  }
});

test("generator fixtures do not duplicate the generated OpenUI catalog", async () => {
  assert.equal(
    await pathExists(EXPANDED_OPENUI_FIXTURE),
    false,
    "Use spec/openui.json as the catalog SSOT instead of adding expanded-openui.json.",
  );
});
