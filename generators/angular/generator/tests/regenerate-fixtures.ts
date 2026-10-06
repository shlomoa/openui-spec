#!/usr/bin/env node
/**
 * Regenerates the expected output workspace of generator fixtures by running the generator on
 * each fixture's input example, so output fixtures are generated and never written by hand
 * (CONTRIBUTING.md, "Examples and fixtures").
 *
 *   npm run regenerate-fixtures                regenerate the fixtures that already have generated output
 *   npm run regenerate-fixtures -- dialog      regenerate the named fixtures, also if they have none yet
 *   npm run regenerate-fixtures -- --all       regenerate every fixture
 *
 * The output workspace is emptied first, so files the generator no longer emits are removed.
 * The tests in `fixture-output.test.ts` fail until the committed output matches.
 */
import { mkdir, readdir, readFile, rm } from "node:fs/promises";
import path from "node:path";

import { fixtureOf, generateFixtureOutput, listFixtures } from "./fixture-output";

async function emptyDirectory(directory: string): Promise<void> {
  await mkdir(directory, { recursive: true });
  for (const entry of await readdir(directory)) {
    await rm(path.join(directory, entry), { recursive: true, force: true });
  }
}

async function main(argv: string[]): Promise<void> {
  const names = argv.filter((argument) => !argument.startsWith("--"));
  const fixtures = names.length > 0
    ? names.map(fixtureOf)
    : await listFixtures(!argv.includes("--all"));

  for (const fixture of fixtures) {
    if (!(await readFile(fixture.input).then(() => true, () => false))) {
      throw new Error(`Fixture '${fixture.name}' has no input example at ${path.relative(process.cwd(), fixture.input)}.`);
    }
    await emptyDirectory(fixture.outputDirectory);
    await generateFixtureOutput(fixture, fixture.outputDirectory);
    console.log(`Regenerated ${path.relative(process.cwd(), fixture.outputDirectory)}`);
  }
}

main(process.argv.slice(2)).catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
