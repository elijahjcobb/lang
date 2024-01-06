import { lexar } from "..";

describe("multiplication", () => {
  it("works on basic", () => {
    expect(lexar(`1 * 2`).statements).toEqual([
      {
        type: "binary-expression",
        expression: "multiplication",
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
