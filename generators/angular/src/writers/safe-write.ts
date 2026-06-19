import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function safeWrite(rootDirectory: string, relativePath: string, content: string): Promise<void> {
  const root = path.resolve(rootDirectory);
  const destination = path.resolve(root, relativePath);
  if (destination !== root && !destination.startsWith(`${root}${path.sep}`)) {
    throw new Error(`Refusing to write outside output directory: ${relativePath}`);
  }
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, content, "utf8");
}
