import { resolveSafeWritePath, safeDelete, safeWrite } from "../writers/safe-write";
import type { ReconciliationPlan } from "./reconcile";

export interface ApplyResult {
  readonly added: readonly string[];
  readonly modified: readonly string[];
  readonly deleted: readonly string[];
  readonly matched: readonly string[];
}

/**
 * Applies a {@link ReconciliationPlan} to the output directory through the
 * path-traversal-guarded writer. `add` and `modify` entries are written,
 * `delete` entries are removed, and `match` entries are intentionally left
 * untouched so unchanged files keep their existing content and timestamps.
 *
 * All destinations are validated up front so a single out-of-tree path aborts
 * the whole apply before any file is written or deleted.
 */
export async function applyReconciliationPlan(
  outDirectory: string,
  plan: ReconciliationPlan,
): Promise<ApplyResult> {
  for (const entry of plan.entries) {
    resolveSafeWritePath(outDirectory, entry.path);
  }

  const added: string[] = [];
  const modified: string[] = [];
  const deleted: string[] = [];
  const matched: string[] = [];

  for (const entry of plan.entries) {
    switch (entry.action) {
      case "add":
        await safeWrite(outDirectory, entry.path, entry.content ?? "");
        added.push(entry.path);
        break;
      case "modify":
        await safeWrite(outDirectory, entry.path, entry.content ?? "");
        modified.push(entry.path);
        break;
      case "delete":
        await safeDelete(outDirectory, entry.path);
        deleted.push(entry.path);
        break;
      case "match":
        matched.push(entry.path);
        break;
    }
  }

  return { added, modified, deleted, matched };
}
