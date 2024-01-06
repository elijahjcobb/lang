import type { Lexar, IntegerLiteral } from "../types";

export const IntegerLexar: Lexar<IntegerLiteral> = {
  canLexar: (statement: string) => {
    return !isNaN(parseInt(statement));
  },
  lexar: (statement: string) => {
    return {
      type: "literal",
      literalType: "integer",
      value: parseInt(statement),
    };
  },
};
