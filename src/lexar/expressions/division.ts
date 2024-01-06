import type { Lexar, DivideBinaryExpression } from "../types";
import { tokenizeBinaryExpression } from "./tokenizeBinaryExpression";

export const DivisionLexar: Lexar<DivideBinaryExpression> = {
  canLexar: (src: string) => {
    return src.includes("/");
  },
  lexar: (src: string) => {
    return tokenizeBinaryExpression(src, "division", "/");
  },
};
