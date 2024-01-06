import { lexar } from "..";
import type {
  Argument,
  Context,
  FunctionDeclaration,
  Lexar,
  Token,
} from "../types";

export const FunctionDeclarationLexar: Lexar<FunctionDeclaration> = {
  canLexar: (statement: string) => {
    return statement.startsWith("fun") && statement.endsWith("}");
  },
  lexar: (src, context) => {
    const statement = src.slice(3);

    const argumentStartIndex = statement.indexOf("(");
    const argumentEndIndex = statement.indexOf(")");
    const name = statement.slice(0, argumentStartIndex).trim();
    const argumentString = statement.slice(
      argumentStartIndex + 1,
      argumentEndIndex
    );
    const argNames = argumentString.split(",").map((s) => s.trim());

    const bodyStart = statement.indexOf("{");
    const bodyEnd = statement.indexOf("}");
    const bodyString = statement.slice(bodyStart + 1, bodyEnd).trim();

    const args: Argument[] = argNames.map((name) => ({
      type: "argument",
      name,
    }));

    const newContext: Context = JSON.parse(JSON.stringify(context));

    for (const arg of args) {
      newContext.heap[arg.name] = arg;
    }

    const token: Token = {
      type: "function-declaration",
      name,
      arguments: args,
      body: lexar(bodyString, newContext).statements,
    };

    context.heap[name] = token;
    newContext.heap[name] = token;

    return {
      type: "function-declaration",
      name,
      arguments: args,
      body: lexar(bodyString, newContext).statements,
    };
  },
};
