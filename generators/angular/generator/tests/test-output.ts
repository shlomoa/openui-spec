import { copyFile, mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const CATALOG_PATH = resolve(__dirname, "..", "..", "..", "..", "..", "spec", "openui.json");

export const KEEP_TEST_OUTPUT_ENV = "OPENUI_KEEP_TEST_OUTPUT";

export async function createTestOutputDirectory(
  prefix: string,
  options: { withCatalog?: boolean } = {},
): Promise<string> {
  const directory = await mkdtemp(join(tmpdir(), prefix));
  if (options.withCatalog) {
    // The generator discovers the catalog by walking up from the input file,
    // so inputs written under the temporary directory need a catalog beside them.
    await mkdir(join(directory, "spec"), { recursive: true });
    await copyFile(CATALOG_PATH, join(directory, "spec", "openui.json"));
  }
  return directory;
}

export function shouldKeepTestOutput(): boolean {
  const value = process.env[KEEP_TEST_OUTPUT_ENV]?.trim().toLowerCase();
  return value === "1" || value === "true" || value === "yes";
}

export async function cleanupTestOutput(path: string): Promise<void> {
  if (shouldKeepTestOutput()) {
    console.info(`Keeping test output at ${path} because ${KEEP_TEST_OUTPUT_ENV} is enabled.`);
    return;
  }

  await rm(path, { recursive: true, force: true });
}
