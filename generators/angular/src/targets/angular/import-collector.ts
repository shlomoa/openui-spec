export class AngularImportCollector {
  private readonly importsByModule = new Map<string, Set<string>>();

  add(moduleSpecifier: string, ...symbols: string[]): void {
    const imports = this.importsByModule.get(moduleSpecifier) ?? new Set<string>();
    for (const symbol of symbols) {
      imports.add(symbol);
    }
    this.importsByModule.set(moduleSpecifier, imports);
  }

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
