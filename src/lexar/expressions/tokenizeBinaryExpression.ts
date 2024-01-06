import { buildTokenFromStatement } from "..";
import { BinaryExpression } from "../types";

export function tokenizeBinaryExpression<
  T extends BinaryExpression,
  E extends T["expression"]
>(stmt: string, expression: E, expressionRaw: string): T {
  const statement = stmt.trim();
  const index = statement.lastIndexOf(expressionRaw);
  const left = statement.slice(0, index);
  const right = statement.slice(index + 1);
  // @ts-ignore
  return {
    type: "binary-expression",
    expression,
    left: buildTokenFromStatement(left),
    right: buildTokenFromStatement(right),
  };
}
