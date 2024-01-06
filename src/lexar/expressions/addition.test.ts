import { lexar } from "..";

describe("addition", () => {
  it("works on basic", () => {
    expect(lexar(`1 + 2`).statements).toEqual([
      {
        type: "binary-expression",
        expression: "addition",
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
  it("works with parenthesis", () => {
    expect(lexar(`(1) + 2`).statements).toEqual([
      {
        type: "binary-expression",
        expression: "addition",
        left: {
          type: "parenthesized-expression",
          expression: {
            type: "literal",
            literalType: "integer",
            value: 1,
          },
        },
        right: {
          type: "literal",
          literalType: "integer",
          value: 2,
        },
      },
    ]);
  });
  it("works on many in chain", () => {
    expect(lexar(`1 + 2 + 3`).statements).toEqual([
      {
        type: "binary-expression",
        expression: "addition",
        left: {
          type: "binary-expression",
          expression: "addition",
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
        right: {
          type: "literal",
          literalType: "integer",
          value: 3,
        },
      },
    ]);
  });
});
