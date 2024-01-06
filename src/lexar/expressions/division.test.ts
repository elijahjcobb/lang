import { lexar } from "..";

describe("division", () => {
  it("works on basic", () => {
    expect(lexar(`1 / 2`).statements).toEqual([
      {
        type: "binary-expression",
        expression: "division",
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
