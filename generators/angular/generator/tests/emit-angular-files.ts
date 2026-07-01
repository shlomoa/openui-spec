import { prepareAngularGeneration } from "../src/generation/generate";
import type { GeneratedFile } from "../src/writers/file-writer";

/**
 * Test helper for inspecting desired Angular files before reconciliation/apply.
 * The generation pipeline itself remains in src as the SSOT.
 */
export async function emitAngularFilesFromInput(inputPath: string): Promise<GeneratedFile[]> {
  const { generatedFiles } = await prepareAngularGeneration(inputPath);
  return generatedFiles;
}
