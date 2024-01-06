import { buildTokenFromStatement } from "..";
import type { Context, Lexar, ReturnExpression, Token } from "../types";

const REGEX = /^return.*/;

function assertType(context: Context, expression: Token | null): void {
  const func = context.callStack[context.callStack.length - 1];
  if (!func) throw new Error("Call stack is empty.");
  const expectedType = func.returnType;
  if (!expectedType) throw new Error("Call stack is empty.");

  if (expectedType === "Void") return;

  const error = new Error(
    `Func ${func.functionName} must return a ${expectedType}.`
  );

  if (expression == null) throw error;

  switch (expression.type) {
    case "literal":
      if (expression.literalType !== expectedType) throw error;
      break;
    case "variable":
      const variable = context.heap[expression.name];
      console.log({ variable, expectedType });
      if (!variable || variable.type !== "variable-declaration")
        throw new Error(
          "Returning something from the heap that is not a variable."
        );
      if (variable.runtimeType !== expectedType) throw error;
      break;
    default:
      throw new Error(`Cannot return ${expression.type}`);
  }

  console.log(JSON.stringify({ expectedType, expression }, null, 2));
}

export const ReturnExpressionLexar: Lexar<ReturnExpression> = {
  canLexar: (src: string, context) => {
    const isReturn = REGEX.test(src);
    if (!isReturn) return false;
    if (context.callStack.length === 0)
      throw new Error("A return statement must be within a function.");
    return true;
  },
  lexar: (src, context) => {
    const statement = src.trim().slice(6);

    const returnExpression = buildTokenFromStatement(statement, context);
    console.log(JSON.stringify({ src, context, returnExpression, statement }));
    assertType(context, returnExpression);
    return {
      type: "return-expression",
      expression: returnExpression,
    };
  },
};
