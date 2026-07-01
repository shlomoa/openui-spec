import assert from "node:assert/strict";
import { test } from "node:test";

import { parseArgs } from "../src/main";
import { LogLevel } from "../src/logging/logger";

test("defaults log level to CRITICAL when --log-level is absent", () => {
  const options = parseArgs(["validate", "--input", "input.json"]);
  assert.equal(options.logLevel, LogLevel.CRITICAL);
});

test("parses --log-level into the matching LogLevel", () => {
  const options = parseArgs(["generate", "--input", "input.json", "--out", "out", "--log-level", "info"]);
  assert.equal(options.logLevel, LogLevel.INFO);
});

test("accepts --log-level case-insensitively", () => {
  const options = parseArgs(["validate", "--input", "input.json", "--log-level", "WARNING"]);
  assert.equal(options.logLevel, LogLevel.WARNING);
});

test("rejects an invalid --log-level value", () => {
  assert.throws(() => parseArgs(["validate", "--input", "input.json", "--log-level", "verbose"]));
});
