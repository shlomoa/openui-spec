import type { GeneratedFile } from "../writers/file-writer";
import type { WorkspaceIndex } from "./workspace-index";

/**
 * Per-artifact reconciliation outcome, matching the scenarios defined in
 * spec/README.md § Incremental generation.
 *
 * - `add` — the artifact is described by the specification but absent from the
 *   workspace, so it must be created.
 * - `modify` — the artifact exists but its content differs from the
 *   specification, so it must be updated.
 * - `match` — the artifact exists and already equals the specification, so no
 *   change is required.
 * - `delete` — the artifact exists in the workspace but is no longer described
 *   by the specification, so it must be removed.
 */
export type ReconciliationAction = "add" | "modify" | "match" | "delete";

export interface ReconciliationEntry {
  readonly path: string;
  readonly action: ReconciliationAction;
  /** Desired content for `add` and `modify`; undefined for `delete` and `match`. */
  readonly content?: string;
}

export interface ReconciliationPlan {
  readonly entries: readonly ReconciliationEntry[];
}

/**
 * Compares the freshly emitted files against an existing workspace and
 * classifies every artifact into an {@link ReconciliationAction}.
 *
 * Files present in both the specification output and the workspace are
 * compared by content: identical content yields `match`, differing content
 * yields `modify`. Files only in the specification output yield `add`; files
 * only in the workspace yield `delete`.
 *
 * Generation from scratch is the special case where the workspace is empty:
 * every emitted file is classified as `add`. Deletion is the special case
 * where the specification no longer emits a previously generated file.
 */
export function reconcile(generatedFiles: readonly GeneratedFile[], workspace: WorkspaceIndex): ReconciliationPlan {
  const entries: ReconciliationEntry[] = [];
  const generatedPaths = new Set<string>();

  for (const file of generatedFiles) {
    generatedPaths.add(file.path);
    const existingContent = workspace.files.get(file.path);
    if (existingContent === undefined) {
      entries.push({ path: file.path, action: "add", content: file.content });
      continue;
    }

    if (existingContent === file.content) {
      entries.push({ path: file.path, action: "match" });
      continue;
    }

    entries.push({ path: file.path, action: "modify", content: file.content });
  }

  for (const existingPath of workspace.files.keys()) {
    if (!generatedPaths.has(existingPath)) {
      entries.push({ path: existingPath, action: "delete" });
    }
  }

  entries.sort((left, right) => left.path.localeCompare(right.path));
  return { entries };
}

/**
 * Returns true when the plan contains no `add`, `modify`, or `delete`
 * entries, i.e. the workspace already matches the specification.
 */
export function isNoOpPlan(plan: ReconciliationPlan): boolean {
  return plan.entries.every((entry) => entry.action === "match");
}
