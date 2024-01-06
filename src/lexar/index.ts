import { AdditionLexar } from "./expressions/addition";
import { DivisionLexar } from "./expressions/division";
import { MultiplicationLexar } from "./expressions/multiplication";
import { ParenthesisLexar } from "./expressions/parenthesis";
import { SubtractionLexar } from "./expressions/subtraction";
import { FunctionCallLexar } from "./functions/call";
import { FunctionDeclarationLexar } from "./functions/declaration";
import { BooleanLexar } from "./literals/boolean";
import { FloatLexar } from "./literals/float";
import { IntegerLexar } from "./literals/integer";
import { StringLexar } from "./literals/string";
import type { Context, Lexar, LexarResult, Token } from "./types";
import { VariableDeclarationLexar } from "./variables/declaration";
import { VariableLexar } from "./variables/read";

const lexars: Lexar<any>[] = [
  FunctionDeclarationLexar,
  FunctionCallLexar,
  VariableDeclarationLexar,
  ParenthesisLexar,
  MultiplicationLexar,
  DivisionLexar,
  AdditionLexar,
  SubtractionLexar,
  StringLexar,
  BooleanLexar,
  FloatLexar,
  IntegerLexar,
  VariableLexar,
];

export function buildTokenFromStatement(
  stmt: string,
  context: Context
): Token | null {
  let statement = stmt.trim();
  if (statement === "") return null;

  for (const lexar of lexars) {
    if (lexar.canLexar(statement, context)) {
      return lexar.lexar(statement, context);
    }
  }

  throw new Error("Cannot tokenize statement: " + statement);
}

export function lexar(src: string, c?: Context): LexarResult {
  const context: Context = c ?? {
    heap: {},
  };

  const lines = src.split("\n");
  const rawStatements = lines.map((line) => line.split(";")).flat();
  const statements = rawStatements
    .map((statement) => statement.trim())
    .filter((statement) => statement.length > 0)
    .map((s) => buildTokenFromStatement(s, context))
    .filter((t): t is Token => t !== null);

  // console.log(JSON.stringify({ statements, context }, null, 4));
  return { statements, context };
}
