export type TokenType =
  | "literal"
  | "binary-expression"
  | "parenthesized-expression"
  | "variable-declaration"
  | "variable"
  | "function-declaration"
  | "argument"
  | "function-call";

export interface BaseToken<T extends TokenType> {
  type: T;
}

export type LiteralType = "integer" | "float" | "string" | "boolean";
export type LiteralValueType = number | string | boolean;

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
] as const;

export type SupportedType = (typeof SUPPORTED_TYPES)[number];

export type IntegerLiteral = BaseLiteral<"integer", number>;
export type FloatLiteral = BaseLiteral<"float", number>;
export type StringLiteral = BaseLiteral<"string", string>;
export type BooleanLiteral = BaseLiteral<"boolean", boolean>;

export type Literal =
  | IntegerLiteral
  | FloatLiteral
  | StringLiteral
  | BooleanLiteral;

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
  body: Token[];
}

export interface FunctionCall extends BaseToken<"function-call"> {
  name: string;
  arguments: Token[];
}

export type Token =
  | Literal
  | BinaryExpression
  | ParenthesizedExpression
  | Variable
  | VariableDeclaration
  | FunctionDeclaration
  | Argument
  | FunctionCall;

export type Heap = Record<
  string,
  VariableDeclaration | FunctionDeclaration | Argument
>;

export interface Context {
  heap: Heap;
}

export interface Lexar<T extends Token> {
  canLexar(src: string, context: Context): boolean;
  lexar(src: string, context: Context): T;
}

export interface LexarResult {
  statements: Token[];
  context: Context;
}
