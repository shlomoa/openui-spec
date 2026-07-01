import { readFile } from "node:fs/promises";
import path from "node:path";

import { classifyWorkspacePath, type Classification, type SpecManifestationIndex } from "./classifier";
import type { WorkspaceIndex } from "./workspace-index";
import type { GeneratedFile } from "../writers/file-writer";

/**
 * Per-file action chosen by the incremental reconciler, following the
 * Add / Match / Modify / Delete scenarios of
 * [spec/README.md § Incremental generation](../../../../spec/README.md#incremental-generation).
 *
 * - `add`: the spec declares the file but the workspace does not have it yet.
 * - `match`: the workspace already has the file with identical content.
 * - `modify`: the workspace has the file but its content differs from the spec.
 * - `delete`: the workspace has the file but the spec no longer declares it.
 */
export type IncrementalAction = "add" | "match" | "modify" | "delete";

/** A single reconciled file: the generated output plus its chosen action. */
export interface ReconciledFile {
  file: GeneratedFile;
  action: IncrementalAction;
  classification: Classification;
}

/**
 * A workspace file the spec no longer emits and that must therefore be
 * removed. Unlike {@link ReconciledFile}, a deletion has no generated content;
 * it carries only the workspace-relative path and the classification that
 * attributes the stray file back to the spec node that previously owned it (or
 * `unknown` for files the spec never owned).
 */
export interface DeletedFile {
  path: string;
  action: "delete";
  classification: Classification;
}

/** Outcome of reconciling a spec's generated files against a workspace. */
export interface IncrementalPlan {
  reconciled: ReconciledFile[];
  /** Files whose content must be written (`add` and `modify`). */
  toWrite: GeneratedFile[];
  /** Workspace files that must be removed because the spec no longer emits them. */
  toDelete: DeletedFile[];
}

/**
 * Reconcile the files a spec would generate against the current contents of an
 * existing workspace, deciding per file whether it is an Add, a Match, a
 * Modify, or (for stray workspace files) a Delete. Matched files are excluded
 * from {@link IncrementalPlan.toWrite} so an incremental run only touches what
 * actually changed; an empty workspace yields an all-Add plan (generation from
 * scratch).
 *
 * The classifier attributes each generated or deleted file to the spec node
 * that owns it, which is what determines "what spec generated this part" for
 * diagnostics and Modify/Delete handling.
 *
 * When a {@link WorkspaceIndex} is supplied, the existing workspace is read
 * once up front: the emitted files are compared against the index, and any
 * indexed file the spec no longer emits is reported as a Delete. When the
 * index is omitted, each emitted file is read lazily from `outDirectory` and no
 * deletions are reported (the reconciler only considers files the spec emits).
 */
export async function reconcileGeneratedFiles(
  outDirectory: string,
  files: GeneratedFile[],
  index: SpecManifestationIndex,
  workspace?: WorkspaceIndex,
): Promise<IncrementalPlan> {
  const reconciled = await Promise.all(
    files.map(async (file): Promise<ReconciledFile> => {
      const classification = classifyWorkspacePath(file.path, index);
      const existing =
        workspace !== undefined
          ? workspace.files.get(file.path)
          : await readExisting(outDirectory, file.path);

      const action: IncrementalAction =
        existing === undefined ? "add" : existing === file.content ? "match" : "modify";

      return { file, action, classification };
    }),
  );

  const toWrite = reconciled.filter((entry) => entry.action !== "match").map((entry) => entry.file);
  const toDelete = workspace === undefined ? [] : planDeletions(files, index, workspace);

  return { reconciled, toWrite, toDelete };
}

/**
 * Determine which indexed workspace files the spec no longer emits. Each such
 * file becomes a {@link DeletedFile}, attributed to its previous owner via the
 * classifier. Results are sorted by path so plans are deterministic.
 */
function planDeletions(
  files: GeneratedFile[],
  index: SpecManifestationIndex,
  workspace: WorkspaceIndex,
): DeletedFile[] {
  const emitted = new Set(files.map((file) => file.path));
  const deletions: DeletedFile[] = [];

  for (const existingPath of workspace.files.keys()) {
    if (!emitted.has(existingPath)) {
      deletions.push({
        path: existingPath,
        action: "delete",
        classification: classifyWorkspacePath(existingPath, index),
      });
    }
  }

  deletions.sort((left, right) => left.path.localeCompare(right.path));
  return deletions;
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
