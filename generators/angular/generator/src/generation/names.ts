/** Converts a separator- or case-delimited name to PascalCase (`app-confirm-dialog` → `AppConfirmDialog`). */
export function toPascalCase(value: string): string {
  return value
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/** Converts an identifier to a human-readable title (`confirmDelete` → `confirm Delete`). */
export function titleFromName(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
