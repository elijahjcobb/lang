import { buildTokenFromStatement } from "..";
import type { Lexar, RecordLiteral } from "../types";

export const RecordLexar: Lexar<RecordLiteral> = {
  canLexar: (statement: string) => {
    return statement.startsWith("{") && statement.endsWith("}");
  },
  lexar: (statement: string, context) => {
    const startBracketIndex = statement.indexOf("{");
    const endBracketIndex = statement.lastIndexOf("}");
    const body = statement.slice(startBracketIndex + 1, endBracketIndex);
    const segments = body.split(",");
    const value: RecordLiteral["value"] = {};

    for (const segment of segments) {
      const [key, valueStatement] = segment.split(":");
      if (!key) throw new Error("Cannot lexar record key");
      if (!valueStatement) throw new Error("Cannot lexar record value");
      const keyTrimmed = key.trim();
      const valueTrimmed = valueStatement.trim();
      const token = buildTokenFromStatement(valueTrimmed, context);
      if (!token) throw new Error("Cannot lexar record value");
      value[keyTrimmed] = token;
    }
    return {
      type: "literal",
      literalType: "Record",
      value,
    };
  },
};
