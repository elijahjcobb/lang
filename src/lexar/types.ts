export type TokenType =
  | "literal"
  | "binary-expression"
  | "parenthesized-expression"
  | "variable-declaration"
  | "variable"
  | "function-declaration"
  | "argument"
  | "function-call"
  | "return-expression";

export interface BaseToken<T extends TokenType> {
  type: T;
}

export type LiteralType = "Integer" | "Float" | "String" | "Boolean" | "Record";
export type LiteralValueTypeBase = string | number | boolean;
export type LiteralValueType = LiteralValueTypeBase | Record<string, Token>;

export interface BaseLiteral<T extends LiteralType, V extends LiteralValueType>
  extends BaseToken<"literal"> {
  literalType: T;
  value: V;
}

export const SUPPORTED_TYPES = [
  "String",
  "Boolean",
  "Integer",
  "Float",
  "Record",
  "Void",
] as const;

export type SupportedType = (typeof SUPPORTED_TYPES)[number];

export type IntegerLiteral = BaseLiteral<"Integer", number>;
export type FloatLiteral = BaseLiteral<"Float", number>;
export type StringLiteral = BaseLiteral<"String", string>;
export type BooleanLiteral = BaseLiteral<"Boolean", boolean>;
export type RecordLiteral = BaseLiteral<"Record", Record<string, Token>>;

export type Literal =
  | IntegerLiteral
  | FloatLiteral
  | StringLiteral
  | BooleanLiteral
  | RecordLiteral;

export type BinaryExpressionType =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division";

export type BinaryOpChild =
  | Token
  | IntegerLiteral
  | FloatLiteral
  | ParenthesizedExpression<IntegerLiteral>
  | ParenthesizedExpression<BinaryExpression>;

export interface BaseBinaryExpression<T extends BinaryExpressionType>
  extends BaseToken<"binary-expression"> {
  expression: T;
  left: BinaryOpChild;
  right: BinaryOpChild;
}

export type AddBinaryExpression = BaseBinaryExpression<"addition">;
export type SubtractBinaryExpression = BaseBinaryExpression<"subtraction">;
export type MultiplyBinaryExpression = BaseBinaryExpression<"multiplication">;
export type DivideBinaryExpression = BaseBinaryExpression<"division">;

export type BinaryExpression =
  | AddBinaryExpression
  | SubtractBinaryExpression
  | MultiplyBinaryExpression
  | DivideBinaryExpression;

export interface ParenthesizedExpression<T extends Token = Token>
  extends BaseToken<"parenthesized-expression"> {
  expression: T | null;
}

export interface Variable extends BaseToken<"variable"> {
  name: string;
}

export interface VariableDeclaration extends BaseToken<"variable-declaration"> {
  name: string;
  runtimeType: SupportedType;
  value: Token;
  isConstant: boolean;
}

export interface Argument extends BaseToken<"argument"> {
  name: string;
  runtimeType: SupportedType;
}

export interface FunctionDeclaration extends BaseToken<"function-declaration"> {
  name: string;
  arguments: Argument[];
  returnType: SupportedType;
  body: Token[];
}

export interface FunctionCall extends BaseToken<"function-call"> {
  name: string;
  arguments: Token[];
}

export interface ReturnExpression extends BaseToken<"return-expression"> {
  expression: Token | null;
}

export type Token =
  | Literal
  | BinaryExpression
  | ParenthesizedExpression
  | Variable
  | VariableDeclaration
  | FunctionDeclaration
  | Argument
  | FunctionCall
  | ReturnExpression;

export type Heap = Record<
  string,
  VariableDeclaration | FunctionDeclaration | Argument
>;

export interface CallStackEntry {
  functionName: string;
  returnType: SupportedType;
}

export interface Context {
  heap: Heap;
  callStack: CallStackEntry[];
}

export interface Lexar<T extends Token> {
  canLexar(src: string, context: Context): boolean;
  lexar(src: string, context: Context): T;
}

export interface LexarResult {
  statements: Token[];
  context: Context;
}
