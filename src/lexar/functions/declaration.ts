import { lexar } from "..";
import { isSupportedType } from "../is-supported-type";
import {
  type Argument,
  type Context,
  type FunctionDeclaration,
  type Lexar,
  type Token,
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

    const token: Token = {
      type: "function-declaration",
      name,
      arguments: args,
      body: lexar(bodyString, newContext).statements,
    };

    context.heap[name] = token;
    newContext.heap[name] = token;
    token.body = lexar(bodyString, newContext).statements;
    return token;
  },
};
