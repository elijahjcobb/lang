import type { LexarResult } from "../lexar/types";

export function interpret({ context, statements }: LexarResult): void {
  console.log("Interpreting statements...");
  console.log({ statements });

  const lines: string[] = [];

  for (const [name, token] of Object.entries(context.heap)) {
    if (token.type === "variable-declaration") {
      lines.push(`${name}: ${token.value}`);
    }
  }

  console.log(lines.join("\n"));

  for (const token of statements) {
    console.log("Interpreting token...");
    console.log({ token });
    if (token.type === "binary-expression") {
      if (token.expression === "addition") {
      }
      if (token.expression === "multiplication") {
        console.log("Interpreting multiplication...");
        console.log({ token });
        console.log("Interpreting left...");
        console.log({ token });
        console.log("Interpreting right...");
        console.log({ token });
      }
      if (token.expression === "subtraction") {
        console.log("Interpreting subtraction...");
        console.log({ token });
        console.log("Interpreting left...");
        console.log({ token });
        console.log("Interpreting right...");
        console.log({ token });
      }
    }
  }
}
