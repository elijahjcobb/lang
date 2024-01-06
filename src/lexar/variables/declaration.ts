import { buildTokenFromStatement } from "..";
import type { Lexar, VariableDeclaration } from "../types";

export const VariableDeclarationLexar: Lexar<VariableDeclaration> = {
  canLexar: (statement: string) => {
    return statement.startsWith("let") || statement.startsWith("var");
  },
  lexar: (src, context) => {
    let statement = src.slice(3);
    statement = statement.trim();
    const segments = statement.split("=");
    const name = segments[0]?.trim();
    if (!name) throw new Error("Cannot lexar variable name");
    const valueStatement = segments[1]?.trim();
    if (!valueStatement) throw new Error("Cannot lexar variable value");
    const value = buildTokenFromStatement(valueStatement, context);
    if (!value) throw new Error("Cannot lexar variable value");
    if (context.heap[name]) throw new Error("Variable already exists");
    const token: VariableDeclaration = {
      type: "variable-declaration",
      name,
      isConstant: src.startsWith("let"),
      value,
    };
    context.heap[name] = token;
    return token;
  },
};
