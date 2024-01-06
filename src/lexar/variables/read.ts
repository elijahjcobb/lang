import type { Lexar, Variable } from "../types";

export const VariableLexar: Lexar<Variable> = {
  canLexar: (statement, context) => {
    return context.heap[statement] !== undefined;
  },
  lexar: (src) => {
    return {
      type: "variable",
      name: src,
    };
  },
};
