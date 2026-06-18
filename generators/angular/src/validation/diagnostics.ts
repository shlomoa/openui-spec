export interface Diagnostic {
  message: string;
  path: string;
}

export class SpecValidationError extends Error {
  constructor(readonly diagnostics: Diagnostic[]) {
    super(diagnostics.map((diagnostic) => `${diagnostic.path}: ${diagnostic.message}`).join("\n"));
    this.name = "SpecValidationError";
  }
}
