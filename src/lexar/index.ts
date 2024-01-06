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
import { RecordLexar } from "./literals/record";
import { StringLexar } from "./literals/string";
import type {
  Context,
  FunctionDeclaration,
  Lexar,
  LexarResult,
  Token,
} from "./types";
import { REGEX, VariableDeclarationLexar } from "./variables/declaration";
import { VariableLexar } from "./variables/read";

const lexars: Lexar<any>[] = [
  VariableDeclarationLexar,
  RecordLexar,
  ParenthesisLexar,
  FunctionCallLexar,
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

function startsWithVariableDeclaration(src: string): boolean {
  const statement = src.trim().replaceAll("\n", "");
  return REGEX.test(statement);
}

export function lexar(src: string, c?: Context): LexarResult {
  const context: Context = c ?? {
    heap: {},
  };

  let input: string = src.trim();

  const statements: Token[] = [];

  while (startsWithVariableDeclaration(input)) {
    const definitions = input.split(";");
    for (const d of definitions) {
      const definition = d.trim();
      if (definition === "") continue;
      if (!VariableDeclarationLexar.canLexar(definition, context)) {
        continue;
      }
      const { token, statement } = VariableDeclarationLexar.specialLexar(
        definition,
        context
      );
      input = input.replace(definition, statement.trim());
      statements.push(token);
    }
  }

  while (FunctionDeclarationLexar.canLexar(input, context)) {
    const { token, statement } = FunctionDeclarationLexar.specialLexar(
      input,
      context
    );
    input = statement;
    statements.push(token);
  }

  const lines = input.split("\n");
  const rawStatements = lines
    .map((line) => line.split(";"))
    .flat()
    .map((statement) => statement.trim())
    .filter((statement) => statement.length > 0)
    .map((s) => buildTokenFromStatement(s, context))
    .filter((t): t is Token => t !== null);

  statements.push(...rawStatements);

  console.log(JSON.stringify({ statements, context, src }, null, 4));

  return { statements, context };
}
