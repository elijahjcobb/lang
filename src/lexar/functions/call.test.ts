import { lexar } from "..";

describe("variables", () => {
  it("works on normal value", () => {
    expect(
      lexar(
        `let y: Integer = 1; fun add(a: Integer, b: Integer): Void { a + b - 1 * 2389 }; add(1, y)`
      )
    ).toEqual({
      context: {
        callStack: [],
        heap: {
          add: {
            arguments: [
              { name: "a", runtimeType: "Integer", type: "argument" },
              { name: "b", runtimeType: "Integer", type: "argument" },
            ],
            body: [
              {
                expression: "multiplication",
                left: {
                  expression: "addition",
                  left: { name: "a", type: "variable" },
                  right: {
                    expression: "subtraction",
                    left: { name: "b", type: "variable" },
                    right: {
                      literalType: "integer",
                      type: "literal",
                      value: 1,
                    },
                    type: "binary-expression",
                  },
                  type: "binary-expression",
                },
                right: { literalType: "integer", type: "literal", value: 2389 },
                type: "binary-expression",
              },
            ],
            name: "add",
            returnType: "Void",
            type: "function-declaration",
          },
          y: {
            isConstant: true,
            name: "y",
            runtimeType: "Integer",
            type: "variable-declaration",
            value: { literalType: "integer", type: "literal", value: 1 },
          },
        },
      },
      statements: [
        {
          isConstant: true,
          name: "y",
          runtimeType: "Integer",
          type: "variable-declaration",
          value: { literalType: "integer", type: "literal", value: 1 },
        },
        {
          arguments: [
            { name: "a", runtimeType: "Integer", type: "argument" },
            { name: "b", runtimeType: "Integer", type: "argument" },
          ],
          body: [
            {
              expression: "multiplication",
              left: {
                expression: "addition",
                left: { name: "a", type: "variable" },
                right: {
                  expression: "subtraction",
                  left: { name: "b", type: "variable" },
                  right: { literalType: "integer", type: "literal", value: 1 },
                  type: "binary-expression",
                },
                type: "binary-expression",
              },
              right: { literalType: "integer", type: "literal", value: 2389 },
              type: "binary-expression",
            },
          ],
          name: "add",
          returnType: "Void",
          type: "function-declaration",
        },
        {
          arguments: [
            { literalType: "integer", type: "literal", value: 1 },
            { name: "y", type: "variable" },
          ],
          name: "add",
          type: "function-call",
        },
      ],
    });
  });
  it("works on normal value", () => {
    expect(
      lexar(
        `let y: Integer = 1; var z: Integer = 21; fun add(a: Integer, b: Integer): Void { a + b - 1 * (2389 - z) }; add(1, y)`
      )
    ).toEqual({
      context: {
        callStack: [],
        heap: {
          add: {
            arguments: [
              {
                name: "a",
                runtimeType: "Integer",
                type: "argument",
              },
              {
                name: "b",
                runtimeType: "Integer",
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
                  expression: {
                    expression: "subtraction",
                    left: {
                      literalType: "integer",
                      type: "literal",
                      value: 2389,
                    },
                    right: {
                      type: "variable",
                      name: "z",
                    },
                    type: "binary-expression",
                  },
                  type: "parenthesized-expression",
                },
                type: "binary-expression",
              },
            ],
            name: "add",
            returnType: "Void",
            type: "function-declaration",
          },
          y: {
            isConstant: true,
            name: "y",
            runtimeType: "Integer",
            type: "variable-declaration",
            value: {
              literalType: "integer",
              type: "literal",
              value: 1,
            },
          },
          z: {
            isConstant: false,
            name: "z",
            runtimeType: "Integer",
            type: "variable-declaration",
            value: {
              literalType: "integer",
              type: "literal",
              value: 21,
            },
          },
        },
      },
      statements: [
        {
          isConstant: true,
          name: "y",
          runtimeType: "Integer",
          type: "variable-declaration",
          value: {
            literalType: "integer",
            type: "literal",
            value: 1,
          },
        },
        {
          isConstant: false,
          name: "z",
          runtimeType: "Integer",
          type: "variable-declaration",
          value: {
            literalType: "integer",
            type: "literal",
            value: 21,
          },
        },
        {
          arguments: [
            {
              name: "a",
              runtimeType: "Integer",
              type: "argument",
            },
            {
              name: "b",
              runtimeType: "Integer",
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
                expression: {
                  expression: "subtraction",
                  left: {
                    literalType: "integer",
                    type: "literal",
                    value: 2389,
                  },
                  right: {
                    type: "variable",
                    name: "z",
                  },
                  type: "binary-expression",
                },
                type: "parenthesized-expression",
              },
              type: "binary-expression",
            },
          ],
          name: "add",
          returnType: "Void",
          type: "function-declaration",
        },
        {
          arguments: [
            {
              literalType: "integer",
              type: "literal",
              value: 1,
            },
            {
              name: "y",
              type: "variable",
            },
          ],
          name: "add",
          type: "function-call",
        },
      ],
    });
  });
});
