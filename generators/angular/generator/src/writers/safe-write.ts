import { mkdir, readdir, rm, rmdir, writeFile } from "node:fs/promises";
import path from "node:path";

export function resolveSafeWritePath(rootDirectory: string, relativePath: string): string {
  const root = path.resolve(rootDirectory);
  const destination = path.resolve(root, relativePath);
  if (destination !== root && !destination.startsWith(`${root}${path.sep}`)) {
    throw new Error(`Refusing to write outside output directory: ${relativePath}`);
  }

  return destination;
}

export async function safeWrite(rootDirectory: string, relativePath: string, content: string): Promise<void> {
  const destination = resolveSafeWritePath(rootDirectory, relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
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
  await rm(destination, { force: true });
  await pruneEmptyDirectories(root, path.dirname(destination));
}

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
