import { lexar } from "..";

describe("variables", () => {
  it("works on integer const", () => {
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
  it("works on string var", () => {
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
        type: "variable-declaration",
        name: "x",
        isConstant: false,
        runtimeType: "Integer",
        value: {
          type: "literal",
          literalType: "integer",
          value: 1,
        },
      },
      {
        type: "variable-declaration",
        name: "a",
        isConstant: true,
        runtimeType: "Integer",
        value: {
          type: "binary-expression",
          expression: "addition",
          left: {
            type: "literal",
            literalType: "integer",
            value: 2,
          },
          right: {
            type: "variable",
            name: "x",
          },
        },
      },
    ]);
  });
});
