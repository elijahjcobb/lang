import type { Token } from "../lexar/types";

export function interpret(tokens: Token[]): void {
  console.log("Interpreting tokens...");
  console.log({ tokens });

  for (const token of tokens) {
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
