import { buildTokenFromStatement } from "..";
import type { Lexar, ParenthesizedExpression } from "../types";

export const ParenthesisLexar: Lexar<ParenthesizedExpression> = {
  canLexar: (statement: string) => {
    return statement.startsWith("(") && statement.endsWith(")");
  },
  lexar: (statement: string) => {
    const child = statement.slice(1, -1);
    return {
      type: "parenthesized-expression",
      expression: buildTokenFromStatement(child),
    };
  },
};
