import { readFile } from "node:fs/promises";

import type { OpenUiDocument } from "./openui-spec.types";

export async function loadOpenUiSpec(specPath: string): Promise<OpenUiDocument> {
  const raw = await readFile(specPath, "utf8");
  return JSON.parse(raw) as OpenUiDocument;
}
