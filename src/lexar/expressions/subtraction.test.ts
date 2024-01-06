import { lexar } from "..";

describe("subtraction", () => {
  it("works on basic", () => {
    expect(lexar(`1 - 2`).statements).toEqual([
      {
        type: "binary-expression",
        expression: "subtraction",
        left: {
          type: "literal",
          literalType: "Integer",
          value: 1,
        },
        right: {
          type: "literal",
          literalType: "Integer",
          value: 2,
        },
      },
    ]);
  });
});
