import { lexar } from "..";

describe("division", () => {
  it("works on basic", () => {
    expect(lexar(`1 / 2`).statements).toEqual([
      {
        type: "binary-expression",
        expression: "division",
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
