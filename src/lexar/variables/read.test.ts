import { lexar } from "..";

describe("read", () => {
  it("works on normal value", () => {
    expect(lexar(`var x = 1; let a = x + 1`).statements).toEqual([
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
