import type { Lexar, BooleanLiteral } from "../types";

export const BooleanLexar: Lexar<BooleanLiteral> = {
  canLexar: (statement: string) => {
    return statement === "true" || statement === "false";
  },
  lexar: (statement: string) => {
    return {
      type: "literal",
      literalType: "boolean",
      value: statement === "true",
    };
  },
};
