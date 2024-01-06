import { lexar } from "..";

describe("parenthesis", () => {
  it("works on empty", () => {
    expect(lexar(`()`).statements).toEqual([
      {
        type: "parenthesized-expression",
        expression: null,
      },
    ]);
  });
  it("works on number", () => {
    expect(lexar(`(1)`).statements).toEqual([
      {
        type: "parenthesized-expression",
        expression: {
          type: "literal",
          literalType: "integer",
          value: 1,
        },
      },
    ]);
  });
  it("works on boolean", () => {
    expect(lexar(`(false)`).statements).toEqual([
      {
        type: "parenthesized-expression",
        expression: {
          type: "literal",
          literalType: "boolean",
          value: false,
        },
      },
    ]);
  });
  it("works on string", () => {
    expect(lexar(`('hi')`).statements).toEqual([
      {
        type: "parenthesized-expression",
        expression: {
          type: "literal",
          literalType: "string",
          value: "hi",
        },
      },
    ]);
  });
  it("works on nested", () => {
    expect(lexar(`(((3)))`).statements).toEqual([
      {
        expression: {
          expression: {
            expression: {
              literalType: "integer",
              type: "literal",
              value: 3,
            },
            type: "parenthesized-expression",
          },
          type: "parenthesized-expression",
        },
        type: "parenthesized-expression",
      },
    ]);
  });
  it("works on addition", () => {
    expect(lexar(`(1 + 2)`).statements).toEqual([
      {
        type: "parenthesized-expression",
        expression: {
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
      },
    ]);
  });
});
