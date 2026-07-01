import { resolveSafeWritePath, safeDelete, safeWrite } from "../writers/safe-write";
import type { IncrementalPlan } from "./reconcile";

export interface ApplyResult {
  readonly added: readonly string[];
  readonly modified: readonly string[];
  readonly deleted: readonly string[];
  readonly matched: readonly string[];
}

/**
 * Applies an {@link IncrementalPlan} to the output directory through the
 * path-traversal-guarded writer. `add` and `modify` files (the plan's
 * `toWrite` set) are written, `delete` files (the plan's `toDelete` set) are
 * removed, and `match` files are intentionally left untouched so unchanged
 * files keep their existing content and timestamps.
 *
 * All destinations — writes and deletes alike — are validated up front so a
 * single out-of-tree path aborts the whole apply before any file is written or
 * deleted.
 */
export async function applyIncrementalPlan(outDirectory: string, plan: IncrementalPlan): Promise<ApplyResult> {
  for (const file of plan.toWrite) {
    resolveSafeWritePath(outDirectory, file.path);
  }
  for (const deletion of plan.toDelete) {
    resolveSafeWritePath(outDirectory, deletion.path);
  }

  const added: string[] = [];
  const modified: string[] = [];
  const matched: string[] = [];

  for (const entry of plan.reconciled) {
    switch (entry.action) {
      case "add":
        await safeWrite(outDirectory, entry.file.path, entry.file.content);
        added.push(entry.file.path);
        break;
      case "modify":
        await safeWrite(outDirectory, entry.file.path, entry.file.content);
        modified.push(entry.file.path);
        break;
      case "match":
        matched.push(entry.file.path);
        break;
      case "delete":
        // Deletions are represented in `toDelete`, not in `reconciled`.
        break;
    }
  }

  const deleted: string[] = [];
  for (const deletion of plan.toDelete) {
    await safeDelete(outDirectory, deletion.path);
    deleted.push(deletion.path);
  }

  return { added, modified, deleted, matched };
}
