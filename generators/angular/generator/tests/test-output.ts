import { mkdir, mkdtemp, rm, rmdir } from "node:fs/promises";
import path from "node:path";

export const KEEP_TEST_OUTPUT_ENV = "OPENUI_KEEP_TEST_OUTPUT";

const ANGULAR_GENERATOR_ROOT =
  path.basename(path.dirname(__dirname)) === "dist"
    ? path.resolve(__dirname, "..", "..")
    : path.resolve(__dirname, "..");
const REPOSITORY_ROOT = path.resolve(ANGULAR_GENERATOR_ROOT, "..", "..", "..");

/** Repo-local, git-ignored scratch root shared by every generator test. */
export const TEST_OUTPUT_ROOT = path.join(REPOSITORY_ROOT, "scratch");

export async function createTestOutputDirectory(prefix: string): Promise<string> {
  // Another test process may remove the empty scratch root between mkdir and
  // mkdtemp (see cleanupTestOutput), so retry when that happens.
  for (let attempt = 1; ; attempt += 1) {
    try {
      await mkdir(TEST_OUTPUT_ROOT, { recursive: true });
      return await mkdtemp(path.join(TEST_OUTPUT_ROOT, prefix));
    } catch (error) {
      if (attempt >= 5 || (error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
    }
  }
}

export function shouldKeepTestOutput(): boolean {
  const value = process.env[KEEP_TEST_OUTPUT_ENV]?.trim().toLowerCase();
  return value === "1" || value === "true" || value === "yes";
}

export async function cleanupTestOutput(directory: string): Promise<void> {
  if (shouldKeepTestOutput()) {
    console.info(`Keeping test output at ${directory} because ${KEEP_TEST_OUTPUT_ENV} is enabled.`);
    return;
  }

  await rm(directory, { recursive: true, force: true });
  // Remove the scratch root once the last test directory is gone; rmdir fails
  // while another test process still has output in it, which is fine.
  await rmdir(TEST_OUTPUT_ROOT).catch(() => undefined);
}
