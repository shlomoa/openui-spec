#!/usr/bin/env node
import { generateIncrementally } from "./generation/generate";
import { loadDefaultOpenUiCatalog } from "./spec/catalog-index";
import { loadOpenUiDocument } from "./spec/load-spec";
import { validateOpenUiGeneratorInput } from "./spec/validate-spec";

interface CliOptions {
  command: "generate" | "validate";
  inputPath: string;
  outPath?: string;
}

export async function run(argv: string[] = process.argv.slice(2)): Promise<void> {
  const options = parseArgs(argv);
  const input = await loadOpenUiDocument(options.inputPath);
  const catalog = await loadDefaultOpenUiCatalog(options.inputPath);
  validateOpenUiGeneratorInput(input, catalog);

  if (options.command === "validate") {
    return;
  }

  if (!options.outPath) {
    throw new Error("Missing required --out option for generate.");
  }

  await generateIncrementally(options.inputPath, options.outPath);
}

function parseArgs(argv: string[]): CliOptions {
  const [command, ...rest] = argv;
  if (command !== "generate" && command !== "validate") {
    throw new Error("Expected command 'generate' or 'validate'.");
  }

  const values = new Map<string, string>();
  for (let index = 0; index < rest.length; index += 2) {
    const key = rest[index];
    const value = rest[index + 1];
    if (!key?.startsWith("--") || !value) {
      throw new Error(`Invalid argument near '${key ?? ""}'.`);
    }
    values.set(key, value);
  }

  const target = values.get("--target") ?? "angular";
  if (target !== "angular") {
    throw new Error(`Unsupported target '${target}'.`);
  }

  const inputPath = values.get("--input");
  if (!inputPath) {
    throw new Error("Missing required --input option.");
  }

  return {
    command,
    inputPath,
    outPath: values.get("--out"),
  };
}

if (require.main === module) {
  run().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
