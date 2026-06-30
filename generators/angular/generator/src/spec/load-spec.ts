import { readFile } from "node:fs/promises";

import type { OpenUiDocument } from "./openui-spec.types";

export async function loadOpenUiDocument(documentPath: string): Promise<OpenUiDocument> {
  const raw = await readFile(documentPath, "utf8");
  return JSON.parse(raw) as OpenUiDocument;
}
