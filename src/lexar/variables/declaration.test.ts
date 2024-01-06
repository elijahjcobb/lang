import { lexar } from "..";

describe("variables", () => {
  it("works on normal value", () => {
    const { statements, context } = lexar(`let x = 1;`);
    expect(statements).toEqual([
      {
        type: "variable-declaration",
        name: "x",
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
    const { statements, context } = lexar(`var a = 'hi'`);
    expect(statements).toEqual([
      {
        type: "variable-declaration",
        name: "a",
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
    expect(lexar(`var x = 1; let a = 2 + x`).statements).toEqual([
      {
        isConstant: false,
        name: "x",
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
