import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import { generate } from "../src/generation/generate";

const ANGULAR_GENERATOR_ROOT =
  path.basename(path.dirname(__dirname)) === "dist"
    ? path.resolve(__dirname, "..", "..")
    : path.resolve(__dirname, "..");

export const FIXTURES_ROOT = path.join(ANGULAR_GENERATOR_ROOT, "tests", "fixtures");

/** Files and folders of an output workspace that are not generator output. */
const IGNORED_ENTRIES: ReadonlySet<string> = new Set([".gitkeep", "node_modules", "dist", ".angular", "package-lock.json"]);

/** A generated fixture: the example it is generated from and the workspace that holds its expected output. */
export interface GeneratedFixture {
  name: string;
  input: string;
  outputDirectory: string;
}

export function fixtureOf(name: string): GeneratedFixture {
  return {
    name,
    input: path.join(FIXTURES_ROOT, name, `input_${name}`, `${name}.example.json`),
    outputDirectory: path.join(FIXTURES_ROOT, name, `output_${name}`),
  };
}

/**
 * Lists the fixtures of `tests/fixtures/<name>/` that have an `input_<name>/<name>.example.json`.
 * With {@link onlyGenerated}, keeps those whose `output_<name>/` holds generator output rather than
 * only a `.gitkeep` placeholder. Fixtures without that layout (`example_from_scratch/`,
 * `example_incremental/`) are maintained separately and are never listed.
 */
export async function listFixtures(onlyGenerated: boolean): Promise<GeneratedFixture[]> {
  const names = (await readdir(FIXTURES_ROOT, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const fixtures: GeneratedFixture[] = [];

  for (const name of names) {
    const fixture = fixtureOf(name);
    if (!(await exists(fixture.input))) {
      continue;
    }
    if (onlyGenerated && (await readTree(fixture.outputDirectory)).size === 0) {
      continue;
    }
    fixtures.push(fixture);
  }

  return fixtures;
}

/** Runs the generator on the fixture's input example into {@link outDirectory}. */
export async function generateFixtureOutput(fixture: GeneratedFixture, outDirectory: string): Promise<void> {
  await generate(fixture.input, outDirectory);
}

/**
 * Reads every file under {@link directory} into a map from POSIX-style relative path to content,
 * skipping the entries that are not generator output. Line endings are normalized to LF so a
 * checkout with CRLF conversion compares equal, and JSON files by value, because the repository's
 * pre-commit formatter rewrites JSON layout (for example it collapses short arrays). A missing
 * directory is an empty tree.
 */
export async function readTree(directory: string): Promise<Map<string, string>> {
  const tree = new Map<string, string>();

  async function visit(current: string, prefix: string): Promise<void> {
    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return;
      }
      throw error;
    }

    for (const entry of entries) {
      if (IGNORED_ENTRIES.has(entry.name)) {
        continue;
      }
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        await visit(path.join(current, entry.name), relative);
      } else {
        tree.set(relative, normalizeContent(entry.name, await readFile(path.join(current, entry.name), "utf8")));
      }
    }
  }

  await visit(directory, "");
  return tree;
}

function normalizeContent(fileName: string, content: string): string {
  const text = content.replace(/\r\n/g, "\n");
  if (!fileName.endsWith(".json")) {
    return text;
  }

  try {
    return JSON.stringify(JSON.parse(text));
  } catch {
    return text;
  }
}

async function exists(candidate: string): Promise<boolean> {
  try {
    await readFile(candidate);
    return true;
  } catch {
    return false;
  }
}
