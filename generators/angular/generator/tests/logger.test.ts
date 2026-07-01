import assert from "node:assert/strict";
import { test } from "node:test";

import {
  DEFAULT_LEVEL,
  getLogger,
  LogLevel,
  levelName,
  parseLevelName,
  resetLogging,
  configureLogging,
} from "../src/logging/logger";

function captureLogger(name: string): { lines: string[]; logger: ReturnType<typeof getLogger> } {
  const lines: string[] = [];
  const logger = getLogger(name, { sink: (line) => lines.push(line) });
  return { lines, logger };
}

test("default level is CRITICAL (critical-only)", () => {
  resetLogging();
  assert.equal(DEFAULT_LEVEL, LogLevel.CRITICAL);
  const { lines, logger } = captureLogger("generator");

  logger.debug("d");
  logger.info("i");
  logger.warning("w");
  logger.error("e");
  logger.critical("c");

  assert.deepEqual(lines, ["CRITICAL:generator:c"]);
});

test("filters records below the effective level (Python semantics)", () => {
  resetLogging();
  const { lines, logger } = captureLogger("generator");
  logger.setLevel(LogLevel.WARNING);

  logger.debug("d");
  logger.info("i");
  logger.warning("w");
  logger.error("e");
  logger.critical("c");

  assert.deepEqual(lines, ["WARNING:generator:w", "ERROR:generator:e", "CRITICAL:generator:c"]);
});

test("formats records like Python's default LEVELNAME:name:message", () => {
  resetLogging();
  const { lines, logger } = captureLogger("amcg.emit");
  logger.setLevel(LogLevel.DEBUG);

  logger.info("emitting %s files");

  assert.deepEqual(lines, ["INFO:amcg.emit:emitting %s files"]);
});

test("configureLogging sets the global default level for loggers", () => {
  resetLogging();
  configureLogging({ level: LogLevel.INFO });
  const { lines, logger } = captureLogger("generator");

  logger.debug("d");
  logger.info("i");

  assert.deepEqual(lines, ["INFO:generator:i"]);
});

test("levelName and parseLevelName round-trip the Python level names", () => {
  resetLogging();
  assert.equal(levelName(LogLevel.DEBUG), "DEBUG");
  assert.equal(levelName(LogLevel.WARNING), "WARNING");
  assert.equal(parseLevelName("debug"), LogLevel.DEBUG);
  assert.equal(parseLevelName("CRITICAL"), LogLevel.CRITICAL);
  assert.throws(() => parseLevelName("verbose"));
});

test("isEnabledFor reflects the effective level", () => {
  resetLogging();
  const { logger } = captureLogger("generator");
  logger.setLevel(LogLevel.ERROR);

  assert.equal(logger.isEnabledFor(LogLevel.WARNING), false);
  assert.equal(logger.isEnabledFor(LogLevel.ERROR), true);
  assert.equal(logger.isEnabledFor(LogLevel.CRITICAL), true);
});
