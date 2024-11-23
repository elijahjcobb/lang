import {
  LexarResult,
  Literal,
  SupportedType,
  Token,
  Variable,
  VariableDeclaration,
} from "../lexar/types";

export type TranspilerResult = string;

export function supportedTypeToCType(type: SupportedType): string {
  switch (type) {
    case "String":
      return "char[]";
    case "Boolean":
      return "char";
    case "Integer":
      return "int";
    case "Float":
      return "float";
    case "Record":
      return "RECORD ERROR";
    case "Void":
      return "void";
  }
}

export function transpileVariable(token: VariableDeclaration): string {
  return `${token.isConstant ? "const" : ""} ${supportedTypeToCType(
    token.runtimeType
  )} ${token.name} = ${handleToken(token.value)};`;
}

export function transpileLiteral(token: Literal): string {
  return `${token.value}`;
}

function handleToken(token: Token): string {
  switch (token.type) {
    case "argument":
      return "";
    case "literal":
      return transpileLiteral(token);
    case "binary-expression":
      return "";
    case "parenthesized-expression":
      return "";
    case "variable":
      return "";
    case "variable-declaration":
      return transpileVariable(token);
    case "function-declaration":
      return "";
    case "function-call":
      return "";
    case "return-expression":
      return "";
    default:
      return "";
  }
}

export function transpile(result: LexarResult): TranspilerResult {
  let source: string[] = [];

  for (const statement of result.statements) {
    source.push(handleToken(statement));
  }
  return source.join("\n");
}
