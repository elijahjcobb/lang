import { lexar } from "..";

describe("variables", () => {
  it("works on normal value", () => {
    expect(lexar(`fun add(a, b) { a + b - 1 * 2389 }`)).toEqual({
      statements: [
        {
          type: "function-declaration",
          name: "add",
          arguments: [
            {
              type: "argument",
              name: "a",
            },
            {
              type: "argument",
              name: "b",
            },
          ],
          body: [
            {
              type: "binary-expression",
              expression: "multiplication",
              left: {
                type: "binary-expression",
                expression: "addition",
                left: {
                  type: "variable",
                  name: "a",
                },
                right: {
                  type: "binary-expression",
                  expression: "subtraction",
                  left: {
                    type: "variable",
                    name: "b",
                  },
                  right: {
                    type: "literal",
                    literalType: "integer",
                    value: 1,
                  },
                },
              },
              right: {
                type: "literal",
                literalType: "integer",
                value: 2389,
              },
            },
          ],
        },
      ],
      context: {
        heap: {},
      },
    });
  });
});
