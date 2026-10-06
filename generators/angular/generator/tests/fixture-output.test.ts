import assert from "node:assert/strict";
import { test } from "node:test";

import { generateFixtureOutput, listFixtures, readTree } from "./fixture-output";
import { cleanupTestOutput, createTestOutputDirectory } from "./test-output";

const REGENERATE_HINT = "Run `npm run regenerate-fixtures` in generators/angular/generator and commit the result.";

test("at least one fixture has generated output", async () => {
  assert.ok((await listFixtures(true)).length > 0);
});

test("every committed output fixture equals what the generator emits for its input", async () => {
  for (const fixture of await listFixtures(true)) {
    const outDirectory = await createTestOutputDirectory(`openui-fixture-${fixture.name}-`);
    try {
      await generateFixtureOutput(fixture, outDirectory);
      const generated = await readTree(outDirectory);
      const committed = await readTree(fixture.outputDirectory);

      assert.deepEqual(
        [...committed.keys()].sort(),
        [...generated.keys()].sort(),
        `output_${fixture.name} has a different set of files than the generator emits. ${REGENERATE_HINT}`,
      );
      for (const [relativePath, content] of generated) {
        assert.equal(
          committed.get(relativePath),
          content,
          `output_${fixture.name}/${relativePath} differs from the generator output. ${REGENERATE_HINT}`,
        );
      }
    } finally {
      await cleanupTestOutput(outDirectory);
    }
  }
});
