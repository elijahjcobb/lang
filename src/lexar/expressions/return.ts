import { buildTokenFromStatement } from "..";
import type { Lexar, ReturnExpression } from "../types";

const REGEX = /^return.*/;

export const ReturnExpressionLexar: Lexar<ReturnExpression> = {
  canLexar: (src: string, context) => {
    const isReturn = REGEX.test(src);
    if (!isReturn) return false;
    if (context.callStack.length === 0)
      throw new Error("A return statement must be within a function.");
    return true;
  },
  lexar: (src, context) => {
    const returnExpression = buildTokenFromStatement(src.slice(6), context);
    return {
      type: "return-expression",
      expression: returnExpression,
    };
  },
};
