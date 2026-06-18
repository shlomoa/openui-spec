import { readFile } from "node:fs/promises";

import type { FrameworkSpecDocument } from "./framework-spec.types.js";

export async function loadFrameworkSpec(specPath: string): Promise<FrameworkSpecDocument> {
  const raw = await readFile(specPath, "utf8");
  return JSON.parse(raw) as FrameworkSpecDocument;
}
