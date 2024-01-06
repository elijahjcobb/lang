import { buildTokenFromStatement } from "..";
import { BinaryExpression, Context } from "../types";

export function tokenizeBinaryExpression<
  T extends BinaryExpression,
  E extends T["expression"]
>(stmt: string, context: Context, expression: E, expressionRaw: string): T {
  const statement = stmt.trim();
  const index = statement.lastIndexOf(expressionRaw);
  const leftStatement = statement.slice(0, index);
  const rightStatement = statement.slice(index + 1);
  const left = buildTokenFromStatement(leftStatement, context);
  const right = buildTokenFromStatement(rightStatement, context);

  if (!left)
    throw new Error(
      `The left side of the ${expression} statement <${leftStatement}> is invalid.`
    );
  if (!right)
    throw new Error(
      `The right side of the ${expression} statement <${rightStatement}> is invalid.`
    );

  // @ts-expect-error
  return {
    type: "binary-expression",
    expression,
    left,
    right,
  };
}
