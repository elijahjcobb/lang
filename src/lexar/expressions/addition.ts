import type { Lexar, AddBinaryExpression } from "../types";
import { tokenizeBinaryExpression } from "./tokenizeBinaryExpression";

export const AdditionLexar: Lexar<AddBinaryExpression> = {
  canLexar: (src: string) => {
    return src.includes("+");
  },
  lexar: (src: string) => {
    return tokenizeBinaryExpression(src, "addition", "+");
  },
};
