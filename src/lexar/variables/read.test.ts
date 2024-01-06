import { lexar } from "..";

describe("read", () => {
  it("works on normal value", () => {
    expect(
      lexar(`var x: Integer = 1; let a: Integer = x + 1`).statements
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
            name: "x",
            type: "variable",
          },
          right: {
            literalType: "integer",
            type: "literal",
            value: 1,
          },
          type: "binary-expression",
        },
      },
    ]);
  });
});
