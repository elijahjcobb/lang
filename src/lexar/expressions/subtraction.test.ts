import { lexar } from "..";

describe("subtraction", () => {
  it("works on basic", () => {
    expect(lexar(`1 - 2`)).toEqual([
      {
        type: "binary-expression",
        expression: "subtraction",
        left: {
          type: "literal",
          literalType: "integer",
          value: 1,
        },
        right: {
          type: "literal",
          literalType: "integer",
          value: 2,
        },
      },
    ]);
  });
});
