import { lexar } from "..";

describe("variables", () => {
  it("works on normal value", () => {
    const { statements, context } = lexar(`let x: Integer = 1;`);
    expect(statements).toEqual([
      {
        type: "variable-declaration",
        name: "x",
        runtimeType: "Integer",
        isConstant: true,
        value: {
          type: "literal",
          literalType: "integer",
          value: 1,
        },
      },
    ]);
    expect(context.heap).toEqual({
      x: {
        isConstant: true,
        name: "x",
        runtimeType: "Integer",
        type: "variable-declaration",
        value: {
          literalType: "integer",
          type: "literal",
          value: 1,
        },
      },
    });
  });
  it("works on empty string", () => {
    const { statements, context } = lexar(`var a: String = 'hi'`);
    expect(statements).toEqual([
      {
        type: "variable-declaration",
        name: "a",
        runtimeType: "String",
        isConstant: false,
        value: {
          type: "literal",
          literalType: "string",
          value: "hi",
        },
      },
    ]);
    expect(context.heap).toEqual({
      a: {
        type: "variable-declaration",
        name: "a",
        runtimeType: "String",
        isConstant: false,
        value: {
          type: "literal",
          literalType: "string",
          value: "hi",
        },
      },
    });
  });
  it("can be read", () => {
    expect(
      lexar(`var x: Integer = 1; let a: Integer = 2 + x`).statements
    ).toEqual([
      {
        isConstant: false,
        name: "x",
        runtimeType: "Integer",
        type: "variable-declaration",
        value: {
          literalType: "integer",
          type: "literal",
          value: 1,
        },
      },
      {
        isConstant: true,
        name: "a",
        runtimeType: "Integer",
        type: "variable-declaration",
        value: {
          expression: "addition",
          left: {
            literalType: "integer",
            type: "literal",
            value: 2,
          },
          right: {
            name: "x",
            type: "variable",
          },
          type: "binary-expression",
        },
      },
    ]);
  });
});
