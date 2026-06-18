#!/usr/bin/env node
import { loadFrameworkSpec } from "../spec/load-spec.js";
import { buildUiModel } from "../ir/build-ir.js";
import { mapToAngularProject } from "../targets/angular/map-to-angular.js";
import { emitAngularProject } from "../targets/angular/emit-angular-project.js";
import { validateFrameworkSpec } from "../validation/validate-spec.js";
import { writeGeneratedFiles } from "../writers/file-writer.js";

interface CliOptions {
  command: "generate" | "validate";
  specPath: string;
  outPath?: string;
  target: "angular";
}

export async function run(argv: string[] = process.argv.slice(2)): Promise<void> {
  const options = parseArgs(argv);
  const spec = await loadFrameworkSpec(options.specPath);
  validateFrameworkSpec(spec);

  if (options.command === "validate") {
    return;
  }

  if (!options.outPath) {
    throw new Error("Missing required --out option for generate.");
  }

  const uiModel = buildUiModel(spec);
  const angularProject = mapToAngularProject(uiModel);
  await writeGeneratedFiles(options.outPath, emitAngularProject(angularProject));
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

  const specPath = values.get("--spec");
  if (!specPath) {
    throw new Error("Missing required --spec option.");
  }

  return {
    command,
    specPath,
    outPath: values.get("--out"),
    target,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
