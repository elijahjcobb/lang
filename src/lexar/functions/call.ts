import { buildTokenFromStatement } from "..";
import type { Argument, Context, FunctionCall, Lexar, Token } from "../types";

export const FunctionCallLexar: Lexar<FunctionCall> = {
  canLexar: (statement, context) => {
    const indexOfFirstParen = statement.indexOf("(");
    const name = statement.slice(0, indexOfFirstParen).trim();
    return (
      context.heap[name]?.type === "function-declaration" &&
      statement.includes("(") &&
      statement.endsWith(")")
    );
  },
  lexar: (src, context) => {
    const indexOfFirstParen = src.indexOf("(");
    const name = src.slice(0, indexOfFirstParen).trim();
    const argumentString = src.slice(indexOfFirstParen + 1, src.length - 1);
    const argumentsRaw = argumentString.split(",").map((s) => s.trim());
    const args: Token[] = argumentsRaw
      .map((arg) => buildTokenFromStatement(arg, context))
      .filter((t): t is Token => t !== null);
    if (args.length !== argumentsRaw.length)
      throw new Error("Failed to parse arguments");
    return {
      type: "function-call",
      name,
      arguments: args,
    };
  },
};
