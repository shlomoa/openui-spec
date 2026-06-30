import { readFile } from "node:fs/promises";
import path from "node:path";

import { classifyWorkspacePath, type Classification, type SpecManifestationIndex } from "./classifier";
import type { GeneratedFile } from "../writers/file-writer";

/**
 * Per-file action chosen by the incremental reconciler, following the
 * Add / Match / Modify scenarios of
 * [spec/README.md § Incremental generation](../../../../spec/README.md#incremental-generation).
 *
 * - `add`: the spec declares the file but the workspace does not have it yet.
 * - `match`: the workspace already has the file with identical content.
 * - `modify`: the workspace has the file but its content differs from the spec.
 */
export type IncrementalAction = "add" | "match" | "modify";

/** A single reconciled file: the generated output plus its chosen action. */
export interface ReconciledFile {
  file: GeneratedFile;
  action: IncrementalAction;
  classification: Classification;
}

/** Outcome of reconciling a spec's generated files against a workspace. */
export interface IncrementalPlan {
  reconciled: ReconciledFile[];
  /** Files whose content must be written (`add` and `modify`). */
  toWrite: GeneratedFile[];
}

/**
 * Reconcile the files a spec would generate against the current contents of an
 * existing workspace, deciding per file whether it is an Add, a Match, or a
 * Modify. Matched files are excluded from {@link IncrementalPlan.toWrite} so an
 * incremental run only touches what actually changed; an empty workspace yields
 * an all-Add plan (generation from scratch).
 *
 * The classifier attributes each generated file to the spec node that owns it,
 * which is what determines "what spec generated this part" for diagnostics and
 * future Modify/Delete handling.
 */
export async function reconcileGeneratedFiles(
  outDirectory: string,
  files: GeneratedFile[],
  index: SpecManifestationIndex,
): Promise<IncrementalPlan> {
  const reconciled = await Promise.all(
    files.map(async (file): Promise<ReconciledFile> => {
      const classification = classifyWorkspacePath(file.path, index);
      const existing = await readExisting(outDirectory, file.path);

      const action: IncrementalAction =
        existing === undefined ? "add" : existing === file.content ? "match" : "modify";

      return { file, action, classification };
    }),
  );

  const toWrite = reconciled.filter((entry) => entry.action !== "match").map((entry) => entry.file);

  return { reconciled, toWrite };
}

async function readExisting(outDirectory: string, relativePath: string): Promise<string | undefined> {
  try {
    return await readFile(path.resolve(outDirectory, relativePath), "utf8");
  } catch (error) {
    if (isFileNotFound(error)) {
      return undefined;
    }
    throw error;
  }
}

function isFileNotFound(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as NodeJS.ErrnoException).code === "ENOENT";
}
