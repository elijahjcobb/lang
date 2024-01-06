import { lexar } from "..";

describe("variables", () => {
  it("works on normal value", () => {
    expect(lexar(`fun add(a, b) { a + b - 1 * 2389 }`)).toEqual({
      context: {
        heap: {
          add: {
            arguments: [
              {
                name: "a",
                type: "argument",
              },
              {
                name: "b",
                type: "argument",
              },
            ],
            body: [
              {
                expression: "multiplication",
                left: {
                  expression: "addition",
                  left: {
                    name: "a",
                    type: "variable",
                  },
                  right: {
                    expression: "subtraction",
                    left: {
                      name: "b",
                      type: "variable",
                    },
                    right: {
                      literalType: "integer",
                      type: "literal",
                      value: 1,
                    },
                    type: "binary-expression",
                  },
                  type: "binary-expression",
                },
                right: {
                  literalType: "integer",
                  type: "literal",
                  value: 2389,
                },
                type: "binary-expression",
              },
            ],
            name: "add",
            type: "function-declaration",
          },
        },
      },
      statements: [
        {
          arguments: [
            {
              name: "a",
              type: "argument",
            },
            {
              name: "b",
              type: "argument",
            },
          ],
          body: [
            {
              expression: "multiplication",
              left: {
                expression: "addition",
                left: {
                  name: "a",
                  type: "variable",
                },
                right: {
                  expression: "subtraction",
                  left: {
                    name: "b",
                    type: "variable",
                  },
                  right: {
                    literalType: "integer",
                    type: "literal",
                    value: 1,
                  },
                  type: "binary-expression",
                },
                type: "binary-expression",
              },
              right: {
                literalType: "integer",
                type: "literal",
                value: 2389,
              },
              type: "binary-expression",
            },
          ],
          name: "add",
          type: "function-declaration",
        },
      ],
    });
  });
});
