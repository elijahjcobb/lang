import type { Lexar, FloatLiteral } from "../types";

export const FloatLexar: Lexar<FloatLiteral> = {
  canLexar: (statement: string) => {
    if (!statement.includes(".")) return false;
    return !isNaN(parseFloat(statement));
  },
  lexar: (statement: string) => {
    return {
      type: "literal",
      literalType: "Float",
      value: parseFloat(statement),
    };
  },
};
