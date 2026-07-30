/**
 * Accumulates the symbols a generated file imports, grouped by module
 * specifier, and renders them as deduplicated, deterministically sorted
 * `import { … } from '…';` statements. Repeated {@link add} calls for the same
 * module merge their symbols, so callers can declare imports incrementally as
 * they build a component.
 */
export class AngularImportCollector {
  private readonly importsByModule = new Map<string, Set<string>>();

  /** Records one or more {@link symbols} imported from {@link moduleSpecifier}, merging with any already collected for that module. */
  add(moduleSpecifier: string, ...symbols: string[]): void {
    const imports = this.importsByModule.get(moduleSpecifier) ?? new Set<string>();
    for (const symbol of symbols) {
      imports.add(symbol);
    }
    this.importsByModule.set(moduleSpecifier, imports);
  }

  /** Renders the collected imports as import statements, sorted by module specifier with symbols sorted within each statement. */
  toImportStatements(): string[] {
    return Array.from(this.importsByModule.entries())
      .sort(([left], [right]) => compareText(left, right))
      .map(([moduleSpecifier, symbols]) => {
        const sortedSymbols = Array.from(symbols).sort(compareText).join(", ");
        return `import { ${sortedSymbols} } from '${moduleSpecifier}';`;
      });
  }
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}
