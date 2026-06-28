import { resolveSafeWritePath, safeWrite } from "./safe-write";

export interface GeneratedFile {
  path: string;
  content: string;
}

export async function writeGeneratedFiles(outDirectory: string, files: GeneratedFile[]): Promise<void> {
  for (const file of files) {
    resolveSafeWritePath(outDirectory, file.path);
  }

  await Promise.all(files.map((file) => safeWrite(outDirectory, file.path, file.content)));
}
