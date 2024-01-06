import { lexar } from "..";

describe("variables", () => {
  it("works on normal value", () => {
    expect(
      lexar(`let y = 1; fun add(a, b) { a + b - 1 * 2389 }; add(1, y)`)
    ).toEqual({
      statements: [
        {
          type: "variable-declaration",
          name: "y",
          isConstant: true,
          value: {
            type: "literal",
            literalType: "integer",
            value: 1,
          },
        },
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
        {
          type: "function-call",
          name: "add",
          arguments: [
            {
              type: "literal",
              literalType: "integer",
              value: 1,
            },
            {
              type: "variable",
              name: "y",
            },
          ],
        },
      ],
      context: {
        heap: {
          y: {
            type: "variable-declaration",
            name: "y",
            isConstant: true,
            value: {
              type: "literal",
              literalType: "integer",
              value: 1,
            },
          },
          add: {
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
        },
      },
    });
  });
});
