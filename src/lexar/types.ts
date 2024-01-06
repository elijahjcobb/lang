export type TokenType =
  | "literal"
  | "binary-expression"
  | "parenthesized-expression";

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
  left: Token;
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

export type Token = Literal | BinaryExpression | ParenthesizedExpression;

export interface Lexar<T extends Token> {
  canLexar(src: string): boolean;
  lexar(src: string): T;
}
