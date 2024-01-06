import { buildTokenFromStatement } from "..";
import { isSupportedType } from "../is-supported-type";
import type { Context, Lexar, VariableDeclaration } from "../types";

export type IVariableDeclarationLexar = Lexar<VariableDeclaration> & {
  specialLexar: (
    statement: string,
    context: Context
  ) => { token: VariableDeclaration; statement: string };
};

export const REGEX = /^(let|var) [a-z-A-Z][a-z-A-Z]*: [a-z-A-Z][a-z-A-Z]* = .*/;

const variableDeclarationLexar = (
  src: string,
  context: Context
): VariableDeclaration => {
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
};

export const VariableDeclarationLexar: IVariableDeclarationLexar = {
  canLexar: (statement: string) => {
    const canParse = REGEX.test(statement);
    return canParse;
  },
  specialLexar: (src, context) => {
    let statement = src;
    const matches = REGEX.exec(statement);
    const match = matches?.[0];
    if (!match) throw new Error("Cannot lexar variable declaration");
    statement = statement.replace(match, "");

    return {
      statement,
      token: variableDeclarationLexar(match, context),
    };
  },
  lexar: variableDeclarationLexar,
};
