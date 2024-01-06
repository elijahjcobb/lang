import { buildTokenFromStatement } from "..";
import { isSupportedType } from "../is-supported-type";
import type { Lexar, VariableDeclaration } from "../types";

export const VariableDeclarationLexar: Lexar<VariableDeclaration> = {
  canLexar: (statement: string) => {
    return statement.startsWith("let") || statement.startsWith("var");
  },
  lexar: (src, context) => {
    let statement = src.slice(3);
    statement = statement.trim();
    const segments = statement.split("=");
    const variable = segments[0]?.trim();
    if (!variable) throw new Error("Cannot lexar variable name");
    const valueStatement = segments[1]?.trim();
    if (!valueStatement) throw new Error("Cannot lexar variable value");
    const value = buildTokenFromStatement(valueStatement, context);
    if (!value) throw new Error("Cannot lexar variable value");

    const [name, type] = variable.split(":").map((s) => s.trim());
    if (!name) throw new Error("Variable must have a name");
    if (!type) throw new Error("Variable must have a type");
    if (!isSupportedType(type))
      throw new Error("Variable must have a valid type");
    if (context.heap[name]) throw new Error("Variable already exists");

    const token: VariableDeclaration = {
      type: "variable-declaration",
      name,
      isConstant: src.startsWith("let"),
      runtimeType: type,
      value,
    };
    context.heap[name] = token;
    return token;
  },
};
