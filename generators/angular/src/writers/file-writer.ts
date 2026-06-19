import { safeWrite } from "./safe-write";

export interface GeneratedFile {
  path: string;
  content: string;
}

export async function writeGeneratedFiles(outDirectory: string, files: GeneratedFile[]): Promise<void> {
  await Promise.all(files.map((file) => safeWrite(outDirectory, file.path, file.content)));
}
