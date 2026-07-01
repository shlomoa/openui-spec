import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

/**
 * A normalized view of an existing generated workspace: a map from
 * POSIX-style relative path to file content. The reconciler compares the
 * emitted {@link GeneratedFile} records against this index to decide whether
 * each artifact must be added, modified, matched, or deleted.
 */
export interface WorkspaceIndex {
  readonly root: string;
  readonly files: ReadonlyMap<string, string>;
}

/**
 * Directory names that are never part of the generated source contract and
 * must be ignored when indexing an existing workspace (installed packages,
 * build output, and version-control metadata).
 */
const IGNORED_DIRECTORIES: ReadonlySet<string> = new Set(["node_modules", "dist", ".git", ".angular"]);

function toRelativePosixPath(root: string, absolutePath: string): string {
  return path.relative(root, absolutePath).split(path.sep).join("/");
}

async function directoryExists(target: string): Promise<boolean> {
  try {
    const stats = await stat(target);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

async function collectFiles(root: string, current: string, files: Map<string, string>): Promise<void> {
  const entries = await readdir(current, { withFileTypes: true });
  for (const entry of entries) {
    const absolutePath = path.join(current, entry.name);
    if (entry.isDirectory()) {
      if (IGNORED_DIRECTORIES.has(entry.name)) {
        continue;
      }
      await collectFiles(root, absolutePath, files);
      continue;
    }

    if (entry.isFile()) {
      const relativePath = toRelativePosixPath(root, absolutePath);
      files.set(relativePath, await readFile(absolutePath, "utf8"));
    }
  }
}

/**
 * Reads an existing workspace directory into a {@link WorkspaceIndex}. A
 * missing directory is treated as an empty workspace, which is the
 * generation-from-scratch special case described in
 * spec/README.md § Incremental generation.
 */
export async function readWorkspaceIndex(root: string): Promise<WorkspaceIndex> {
  const resolvedRoot = path.resolve(root);
  const files = new Map<string, string>();
  if (await directoryExists(resolvedRoot)) {
    await collectFiles(resolvedRoot, resolvedRoot, files);
  }

  return { root: resolvedRoot, files };
}

/**
 * Returns true when the workspace contains no generated source files, meaning
 * generation should proceed from scratch rather than incrementally.
 */
export function isEmptyWorkspace(index: WorkspaceIndex): boolean {
  return index.files.size === 0;
}
