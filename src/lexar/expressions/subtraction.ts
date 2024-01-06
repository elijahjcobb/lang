import type { Lexar, SubtractBinaryExpression } from "../types";
import { tokenizeBinaryExpression } from "./tokenizeBinaryExpression";

export const SubtractionLexar: Lexar<SubtractBinaryExpression> = {
  canLexar: (src: string) => {
    const minusCharIndex = src.indexOf("-");
    return minusCharIndex !== -1 && src[minusCharIndex + 1] === " ";
  },
  lexar: (src: string, context) => {
    return tokenizeBinaryExpression(src, context, "subtraction", "-");
  },
};
