import { AdditionLexar } from "./expressions/addition";
import { DivisionLexar } from "./expressions/division";
import { MultiplicationLexar } from "./expressions/multiplication";
import { ParenthesisLexar } from "./expressions/parenthesis";
import { SubtractionLexar } from "./expressions/subtraction";
import { BooleanLexar } from "./literals/boolean";
import { FloatLexar } from "./literals/float";
import { IntegerLexar } from "./literals/integer";
import { StringLexar } from "./literals/string";
import type { Lexar, Token } from "./types";

const lexars: Lexar<any>[] = [
  ParenthesisLexar,
  MultiplicationLexar,
  DivisionLexar,
  AdditionLexar,
  SubtractionLexar,
  StringLexar,
  BooleanLexar,
  FloatLexar,
  IntegerLexar,
];

export function buildTokenFromStatement(stmt: string): Token | null {
  let statement = stmt.trim();
  if (statement === "") return null;

  for (const lexar of lexars) {
    if (lexar.canLexar(statement)) {
      return lexar.lexar(statement);
    }
  }

  throw new Error("Cannot tokenize statement: " + statement);
}

export function lexar(src: string): Token[] {
  const lines = src.split("\n");
  const rawStatements = lines.map((line) => line.split(";")).flat();
  const statements = rawStatements
    .map((statement) => statement.trim())
    .filter((statement) => statement.length > 0)
    .map(buildTokenFromStatement)
    .filter((t): t is Token => t !== null);

  console.log(JSON.stringify(statements, null, 4));
  return statements;
}
