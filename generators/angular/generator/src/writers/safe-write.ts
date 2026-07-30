import { mkdir, readdir, rm, rmdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { describeGeneratedContent } from "./describe-content";
import { getLogger } from "../logging/logger";

const log = getLogger("amcg.writer");

/**
 * Resolves a workspace-relative path to an absolute path inside the output
 * directory, rejecting any path that would escape the root. This path-traversal
 * guard is shared by {@link safeWrite} and {@link safeDelete} so no write or
 * delete can reach outside the generated workspace.
 */
export function resolveSafeWritePath(rootDirectory: string, relativePath: string): string {
  const root = path.resolve(rootDirectory);
  const destination = path.resolve(root, relativePath);
  if (destination !== root && !destination.startsWith(`${root}${path.sep}`)) {
    throw new Error(`Refusing to write outside output directory: ${relativePath}`);
  }

  return destination;
}

/**
 * Writes {@link content} to {@link relativePath} inside the output directory,
 * creating any missing parent directories first and enforcing the
 * path-traversal guard from {@link resolveSafeWritePath}.
 */
export async function safeWrite(rootDirectory: string, relativePath: string, content: string): Promise<void> {
  const destination = resolveSafeWritePath(rootDirectory, relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  log.debug(`Writing to '${relativePath}': ${describeGeneratedContent(relativePath, content)}`);
  await writeFile(destination, content, "utf8");
}

/**
 * Removes a single file inside the output directory, applying the same
 * path-traversal protection as {@link safeWrite}. After removing the file, any
 * directories that became empty up to (but excluding) the output root are
 * pruned so deletions do not leave behind empty component or page folders.
 */
export async function safeDelete(rootDirectory: string, relativePath: string): Promise<void> {
  const root = path.resolve(rootDirectory);
  const destination = resolveSafeWritePath(root, relativePath);
  log.debug(`Deleting '${relativePath}'.`);
  await rm(destination, { force: true });
  await pruneEmptyDirectories(root, path.dirname(destination));
}

/**
 * Walks upward from {@link startDirectory} toward (but not including)
 * {@link root}, removing each directory that has become empty. Stops at the
 * first directory that is non-empty or cannot be read, so only folders emptied
 * by a deletion are pruned.
 */
async function pruneEmptyDirectories(root: string, startDirectory: string): Promise<void> {
  let current = startDirectory;
  while (current !== root && current.startsWith(`${root}${path.sep}`)) {
    let remaining: string[];
    try {
      remaining = await readdir(current);
    } catch {
      return;
    }

    if (remaining.length > 0) {
      return;
    }

    await rmdir(current);
    current = path.dirname(current);
  }
}
