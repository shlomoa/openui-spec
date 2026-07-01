/**
 * Minimal logging facility modeled on Python's `logging` module: numeric
 * severity levels, level-based filtering, and the default
 * `LEVELNAME:name:message` record format. It intentionally implements only the
 * subset the Angular generator needs (named loggers, a global default level,
 * and a pluggable sink for testing).
 */

export enum LogLevel {
  NOTSET = 0,
  DEBUG = 10,
  INFO = 20,
  WARNING = 30,
  ERROR = 40,
  CRITICAL = 50,
}

/** Default effective level: critical messages only. */
export const DEFAULT_LEVEL: LogLevel = LogLevel.CRITICAL;

/** A log record sink. Receives one fully formatted line per record. */
export type LogSink = (line: string) => void;

const LEVEL_NAMES: ReadonlyMap<LogLevel, string> = new Map([
  [LogLevel.NOTSET, "NOTSET"],
  [LogLevel.DEBUG, "DEBUG"],
  [LogLevel.INFO, "INFO"],
  [LogLevel.WARNING, "WARNING"],
  [LogLevel.ERROR, "ERROR"],
  [LogLevel.CRITICAL, "CRITICAL"],
]);

const NAME_LEVELS: ReadonlyMap<string, LogLevel> = new Map(
  Array.from(LEVEL_NAMES, ([level, name]) => [name, level]),
);

/** Returns the Python-style upper-case name for a level. */
export function levelName(level: LogLevel): string {
  const name = LEVEL_NAMES.get(level);
  if (name === undefined) {
    throw new Error(`Unknown log level: ${String(level)}`);
  }
  return name;
}

/** Parses a case-insensitive level name (e.g. "debug") into a `LogLevel`. */
export function parseLevelName(name: string): LogLevel {
  const level = NAME_LEVELS.get(name.trim().toUpperCase());
  if (level === undefined) {
    const valid = Array.from(NAME_LEVELS.keys()).join(", ");
    throw new Error(`Invalid log level '${name}'. Expected one of: ${valid}.`);
  }
  return level;
}

function defaultSink(line: string): void {
  // Diagnostics go to stderr so generated output on stdout stays clean.
  console.error(line);
}

let rootLevel: LogLevel = DEFAULT_LEVEL;
let rootSink: LogSink = defaultSink;
const registry = new Map<string, Logger>();

export interface LoggerOptions {
  level?: LogLevel;
  sink?: LogSink;
}

export class Logger {
  readonly name: string;
  private level: LogLevel;
  private sink: LogSink | undefined;

  constructor(name: string, options: LoggerOptions = {}) {
    this.name = name;
    this.level = options.level ?? LogLevel.NOTSET;
    this.sink = options.sink;
  }

  /** Sets this logger's own level. `NOTSET` defers to the global level. */
  setLevel(level: LogLevel): void {
    this.level = level;
  }

  setSink(sink: LogSink): void {
    this.sink = sink;
  }

  /** Own level if set, otherwise the global default level. */
  getEffectiveLevel(): LogLevel {
    return this.level === LogLevel.NOTSET ? rootLevel : this.level;
  }

  isEnabledFor(level: LogLevel): boolean {
    return level >= this.getEffectiveLevel();
  }

  log(level: LogLevel, message: string): void {
    if (!this.isEnabledFor(level)) {
      return;
    }
    const line = `${levelName(level)}:${this.name}:${message}`;
    (this.sink ?? rootSink)(line);
  }

  debug(message: string): void {
    this.log(LogLevel.DEBUG, message);
  }

  info(message: string): void {
    this.log(LogLevel.INFO, message);
  }

  warning(message: string): void {
    this.log(LogLevel.WARNING, message);
  }

  error(message: string): void {
    this.log(LogLevel.ERROR, message);
  }

  critical(message: string): void {
    this.log(LogLevel.CRITICAL, message);
  }
}

/** Returns the named logger, creating it on first use (Python-style registry). */
export function getLogger(name: string, options: LoggerOptions = {}): Logger {
  let logger = registry.get(name);
  if (!logger) {
    logger = new Logger(name, options);
    registry.set(name, logger);
    return logger;
  }
  if (options.level !== undefined) {
    logger.setLevel(options.level);
  }
  if (options.sink !== undefined) {
    logger.setSink(options.sink);
  }
  return logger;
}

export interface LoggingConfig {
  level?: LogLevel;
  sink?: LogSink;
}

/** Sets the global default level and/or sink used by loggers without overrides. */
export function configureLogging(config: LoggingConfig): void {
  if (config.level !== undefined) {
    rootLevel = config.level;
  }
  if (config.sink !== undefined) {
    rootSink = config.sink;
  }
}

/** Restores global logging defaults and clears the registry (test helper). */
export function resetLogging(): void {
  rootLevel = DEFAULT_LEVEL;
  rootSink = defaultSink;
  registry.clear();
}
