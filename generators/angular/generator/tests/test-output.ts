import { rm } from "node:fs/promises";

export const KEEP_TEST_OUTPUT_ENV = "OPENUI_KEEP_TEST_OUTPUT";

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
