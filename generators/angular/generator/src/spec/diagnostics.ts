export interface Diagnostic {
  /**
   * The stage-prefixed code of the broken rule, as in the packages and in
   * `spec/conformance/diagnostics.schema.json`. A diagnostic the packages have no
   * counterpart for carries no code.
   */
  code?: string;
  message: string;
  /** A JSON Pointer (RFC 6901) for a diagnostic with a code. */
  path: string;
}

export class SpecValidationError extends Error {
  constructor(readonly diagnostics: Diagnostic[]) {
    super(
      diagnostics
        .map((diagnostic) => `${diagnostic.path}: ${diagnostic.code ? `${diagnostic.code}: ` : ""}${diagnostic.message}`)
        .join("\n"),
    );
    this.name = "SpecValidationError";
  }
}
