#!/usr/bin/env node

import { readFileSync, statSync } from "node:fs";

import { OpenUiJson, OpenUiJsonError, type JsonObject } from "./index";

type Command = "validate" | "add" | "remove" | "modify";

interface Arguments {
  command: Command;
  input: string;
  output?: string;
  parent?: string;
  id?: string;
  attrs?: JsonObject;
  object?: JsonObject;
}

class ArgumentError extends Error {}

const commandOptions: Record<Command, ReadonlySet<string>> = {
  validate: new Set(["--input"]),
  add: new Set(["--input", "--output", "--parent", "--object"]),
  remove: new Set(["--input", "--output", "--id", "--parent"]),
  modify: new Set(["--input", "--output", "--id", "--parent", "--attrs", "--object"]),
};

export function main(argv: string[] = process.argv.slice(2)): number {
  try {
    if (argv.length === 1 && isHelp(argv[0])) {
      process.stdout.write("usage: openui-json <validate|add|remove|modify> [options]\n");
      return 0;
    }
    if (isCommand(argv[0]) && argv.length === 2 && isHelp(argv[1])) {
      process.stdout.write(`usage: openui-json ${argv[0]} [options]\n`);
      return 0;
    }
    const arguments_ = parseArguments(argv);
    const document = OpenUiJson.load(arguments_.input);
    if (arguments_.command === "validate") {
      document.validate();
      return 0;
    }
    if (arguments_.command === "add") {
      document.add(arguments_.parent!, arguments_.object!);
    } else if (arguments_.command === "remove") {
      document.remove(arguments_.id!, { parentId: arguments_.parent });
    } else if (arguments_.attrs !== undefined) {
      document.updateAttributes(arguments_.id!, arguments_.attrs);
    } else {
      document.replace(arguments_.id!, arguments_.object!, { parentId: arguments_.parent });
    }
    document.validate();
    document.save(arguments_.output ?? arguments_.input);
    return 0;
  } catch (error) {
    const exitCode = error instanceof ArgumentError ? 2 : 1;
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`error: ${message}\n`);
    return exitCode;
  }
}

function parseArguments(argv: string[]): Arguments {
  const command = argv[0];
  if (!isCommand(command)) {
    throw new ArgumentError("a command is required: validate, add, remove, or modify");
  }

  const values = new Map<string, string>();
  for (let index = 1; index < argv.length; index += 1) {
    const [option, inlineValue] = splitOption(argv[index]);
    if (!commandOptions[command].has(option)) {
      throw new ArgumentError(`unrecognized argument: ${option}`);
    }
    const value = inlineValue ?? argv[index + 1];
    if (value === undefined || value.startsWith("--")) {
      throw new ArgumentError(`argument ${option}: expected one argument`);
    }
    values.set(option, value);
    if (inlineValue === undefined) {
      index += 1;
    }
  }

  const input = values.get("--input");
  if (input === undefined) {
    throw new ArgumentError("the following arguments are required: --input");
  }
  if (command === "validate") {
    return { command, input };
  }

  const result: Arguments = {
    command,
    input,
    output: values.get("--output"),
    parent: values.get("--parent"),
    id: values.get("--id"),
  };
  if (command === "add") {
    result.object = jsonArgument(requiredValue(values, "--object"));
    result.parent = requiredValue(values, "--parent");
  } else if (command === "remove") {
    result.id = requiredValue(values, "--id");
  } else {
    result.id = requiredValue(values, "--id");
    const attrs = values.get("--attrs");
    const object = values.get("--object");
    if ((attrs === undefined) === (object === undefined)) {
      throw new ArgumentError("exactly one of --attrs or --object is required");
    }
    if (attrs !== undefined) {
      result.attrs = jsonArgument(attrs);
    } else {
      result.object = jsonArgument(object!);
    }
  }
  return result;
}

function requiredValue(values: ReadonlyMap<string, string>, option: string): string {
  const value = values.get(option);
  if (value === undefined) {
    throw new ArgumentError(`the following arguments are required: ${option}`);
  }
  return value;
}

function splitOption(argument: string): [string, string | undefined] {
  const separator = argument.indexOf("=");
  return separator === -1
    ? [argument, undefined]
    : [argument.slice(0, separator), argument.slice(separator + 1)];
}

function jsonArgument(value: string): JsonObject {
  try {
    let content = value;
    try {
      if (statSync(value).isFile()) {
        content = readFileSync(value, "utf8");
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
    }
    const parsed: unknown = JSON.parse(content);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      throw new ArgumentError("JSON input must be an object");
    }
    return parsed as JsonObject;
  } catch (error) {
    if (error instanceof ArgumentError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : String(error);
    throw new ArgumentError(`invalid JSON: ${message}`);
  }
}

function isCommand(value: string | undefined): value is Command {
  return value === "validate" || value === "add" || value === "remove" || value === "modify";
}

function isHelp(value: string | undefined): boolean {
  return value === "--help" || value === "-h";
}

if (require.main === module) {
  process.exitCode = main();
}
