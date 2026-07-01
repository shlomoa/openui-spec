export function toTypeScriptObjectLiteral(value: unknown): string {
  return JSON.stringify(value, null, 2).replace(/\"([A-Za-z_$][\w$]*)\":/g, "$1:");
}

export function toIndentedTypeScriptLiteral(value: unknown): string {
  return JSON.stringify(value, null, 2)
    .replace(/\"([^\"\\]*(?:\\.[^\"\\]*)*)\":/g, "$1:")
    .replace(/\n/g, "\n  ");
}

export function toTypeScriptStringArray(values: string[]): string {
  return `[${values.map((value) => JSON.stringify(value)).join(", ")}]`;
}
