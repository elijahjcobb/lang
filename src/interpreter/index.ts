import type { LexarResult } from "../lexar/types";

export function interpret({ context, statements }: LexarResult): void {
  const lines: string[] = [];

  for (const [name, token] of Object.entries(context.heap)) {
    if (token.type === "variable-declaration") {
      lines.push(`${name}: ${token.value}`);
    }
  }
  for (const token of statements) {
    if (token.type === "binary-expression") {
      if (token.expression === "addition") {
      }
      if (token.expression === "multiplication") {
      }
      if (token.expression === "subtraction") {
      }
    }
  }
}
