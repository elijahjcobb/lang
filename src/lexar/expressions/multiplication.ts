import type { Lexar, MultiplyBinaryExpression } from "../types";
import { tokenizeBinaryExpression } from "./tokenizeBinaryExpression";

export const MultiplicationLexar: Lexar<MultiplyBinaryExpression> = {
  canLexar: (src: string) => {
    return src.includes("*");
  },
  lexar: (src, context) => {
    return tokenizeBinaryExpression(src, context, "multiplication", "*");
  },
};
