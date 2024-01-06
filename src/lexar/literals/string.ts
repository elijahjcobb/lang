import type { Lexar, StringLiteral } from "../types";

export const StringLexar: Lexar<StringLiteral> = {
  canLexar: (statement: string) => {
    return statement.startsWith("'") && statement.endsWith("'");
  },
  lexar: (statement: string) => {
    return {
      type: "literal",
      literalType: "string",
      value: statement.slice(1, statement.length - 1),
    };
  },
};
