import { lexar } from "..";
import { isSupportedType } from "../is-supported-type";
import {
  type Argument,
  type Context,
  type FunctionDeclaration,
  type Lexar,
  type Token,
} from "../types";

const FUNCTION_REGEX =
  /fun ([a-zA-Z][a-zA-Z0-9]*)((\((([a-zA-Z][a-zA-Z0-9]*): ([a-zA-Z][A-Za-z0-9]*))(, (([a-zA-Z][a-zA-Z0-9]*): ([a-zA-Z][A-Za-z0-9]*)\)))|\((([a-zA-Z][a-zA-Z0-9]*): ([a-zA-Z][A-Za-z0-9]*)\)))|(\(\))): ([a-zA-Z][a-zA-Z0-9]*) \{([\s\S])*\}/;

export type IFunctionDeclarationLexar = Lexar<FunctionDeclaration> & {
  specialLexar: (
    statement: string,
    context: Context
  ) => { token: FunctionDeclaration; statement: string };
};

const functionLexar = (
  statement: string,
  context: Context
): FunctionDeclaration => {
  const argumentStartIndex = statement.indexOf("(");
  const argumentEndIndex = statement.indexOf(")");
  const name = statement.slice(4, argumentStartIndex).trim();
  const argumentString = statement.slice(
    argumentStartIndex + 1,
    argumentEndIndex
  );
  const argNames = argumentString
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s !== "");

  const returnTypeStartIndex = statement.indexOf("):");
  const returnTypeEndIndex = statement.indexOf("{");
  const returnType = statement
    .slice(returnTypeStartIndex + 2, returnTypeEndIndex)
    .trim();
  if (!isSupportedType(returnType))
    throw new Error("Return type on function invalid type");

  const bodyStart = statement.indexOf("{");
  const bodyEnd = statement.lastIndexOf("}");
  const bodyString = statement.slice(bodyStart + 1, bodyEnd).trim();

  const args: Argument[] = argNames.map((arg) => {
    const [name, type] = arg.split(":").map((s) => s.trim());
    if (!name) throw new Error("Argument must have a name");
    if (!type) throw new Error("Argument must have a type");
    if (!isSupportedType(type))
      throw new Error("Argument must have a valid type");
    return {
      type: "argument",
      name,
      runtimeType: type,
    };
  });

  const newContext: Context = JSON.parse(JSON.stringify(context));

  for (const arg of args) {
    newContext.heap[arg.name] = arg;
  }

  newContext.callStack.push({ functionName: name, returnType });

  const token: Token = {
    type: "function-declaration",
    name,
    arguments: args,
    returnType,
    body: lexar(bodyString, newContext).statements,
  };

  context.heap[name] = token;
  newContext.heap[name] = token;
  token.body = lexar(bodyString, newContext).statements;
  return token;
};

export const FunctionDeclarationLexar: IFunctionDeclarationLexar = {
  canLexar: (statement: string) => {
    return FUNCTION_REGEX.test(statement);
  },
  specialLexar: (
    statement: string,
    context: Context
  ): { token: FunctionDeclaration; statement: string } => {
    const regExResult = FUNCTION_REGEX.exec(statement);
    const match = regExResult?.[0];
    if (!match) throw new Error("Cannot lexar function declaration");
    return {
      token: functionLexar(match, context),
      statement: statement.replace(match, ""),
    };
  },
  lexar: functionLexar,
};
