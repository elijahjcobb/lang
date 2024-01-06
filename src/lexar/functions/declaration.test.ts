import { lexar } from "..";
import { Context } from "../types";
import { FunctionDeclarationLexar } from "./declaration";

const CONTEXT = {} as Context;

describe("declaration", () => {
  const QUICK_TESTS: Record<string, boolean> = {
    "": false,
    "'foo'": false,
    false: false,
    foo: false,
    "fun foo() {}": false,
    "fun foo(): Integer {}": true,
    "fun foo(a: Integer, b: Integer): Integer {}": true,
    "fun foo(a: Integer, b: Integer) {}": false,
    "fun foo(a: Integer, b: Integer): Void {}": true,
    "fun foo(a, b: Integer): Void {}": false,
    "fun foo(a, b): Void {}": false,
    "fun foo(a: I, b): Void {}": false,
    "fun foo(a: I, c: Int): Void {}": true,
    "fun _foo(a: I, c: Int): Void {}": false,
    "fun 3foo(a: I, c: Int): Void {}": false,
    "fun foo(39d: I, c: Int): Void {}": false,
    "fun foo(d923: I, c: Int): Void {}": true,
    "fun foo(d923: I, c32: Int): Void {}": true,
    "fun foo(d923: I, c32: Int): Void23 {}": true,
  };

  describe("canLexar", () => {
    describe("quick tests", () => {
      for (const [key, value] of Object.entries(QUICK_TESTS)) {
        it(`should return \`${value}\` for \`${key}\``, () => {
          expect(FunctionDeclarationLexar.canLexar(key, CONTEXT)).toEqual(
            value
          );
        });
      }
    });
  });
  it("works with a global variable declaration then a function def, then calling func", () => {
    expect(
      lexar(`
    let x: Integer = 3;
    fun add(a: Integer, b: Integer): Void {
      a + b - x * 31
    }
    add(1, 2)
    `)
    ).toEqual({
      statements: [
        {
          type: "variable-declaration",
          name: "x",
          isConstant: true,
          runtimeType: "Integer",
          value: {
            type: "literal",
            literalType: "integer",
            value: 3,
          },
        },
        {
          type: "function-declaration",
          name: "add",
          arguments: [
            {
              type: "argument",
              name: "a",
              runtimeType: "Integer",
            },
            {
              type: "argument",
              name: "b",
              runtimeType: "Integer",
            },
          ],
          returnType: "Void",
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
                    type: "variable",
                    name: "x",
                  },
                },
              },
              right: {
                type: "literal",
                literalType: "integer",
                value: 31,
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
              type: "literal",
              literalType: "integer",
              value: 2,
            },
          ],
        },
      ],
      context: {
        callStack: [],
        heap: {
          x: {
            type: "variable-declaration",
            name: "x",
            isConstant: true,
            runtimeType: "Integer",
            value: {
              type: "literal",
              literalType: "integer",
              value: 3,
            },
          },
          add: {
            type: "function-declaration",
            name: "add",
            arguments: [
              {
                type: "argument",
                name: "a",
                runtimeType: "Integer",
              },
              {
                type: "argument",
                name: "b",
                runtimeType: "Integer",
              },
            ],
            returnType: "Void",
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
                      type: "variable",
                      name: "x",
                    },
                  },
                },
                right: {
                  type: "literal",
                  literalType: "integer",
                  value: 31,
                },
              },
            ],
          },
        },
      },
    });
  });
  it("works allows defining local vars", () => {
    expect(
      lexar(`fun add(a: Integer, b: Integer): Void { 
        let x: Integer = 3;
        a + b - x * 31
       }`)
    ).toEqual({
      statements: [
        {
          type: "function-declaration",
          name: "add",
          arguments: [
            {
              type: "argument",
              name: "a",
              runtimeType: "Integer",
            },
            {
              type: "argument",
              name: "b",
              runtimeType: "Integer",
            },
          ],
          returnType: "Void",
          body: [
            {
              type: "variable-declaration",
              name: "x",
              isConstant: true,
              runtimeType: "Integer",
              value: {
                type: "literal",
                literalType: "integer",
                value: 3,
              },
            },
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
                    type: "variable",
                    name: "x",
                  },
                },
              },
              right: {
                type: "literal",
                literalType: "integer",
                value: 31,
              },
            },
          ],
        },
      ],
      context: {
        callStack: [],
        heap: {
          add: {
            type: "function-declaration",
            name: "add",
            arguments: [
              {
                type: "argument",
                name: "a",
                runtimeType: "Integer",
              },
              {
                type: "argument",
                name: "b",
                runtimeType: "Integer",
              },
            ],
            returnType: "Void",
            body: [
              {
                type: "variable-declaration",
                name: "x",
                isConstant: true,
                runtimeType: "Integer",
                value: {
                  type: "literal",
                  literalType: "integer",
                  value: 3,
                },
              },
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
                      type: "variable",
                      name: "x",
                    },
                  },
                },
                right: {
                  type: "literal",
                  literalType: "integer",
                  value: 31,
                },
              },
            ],
          },
        },
      },
    });
  });
  it("works on normal value", () => {
    expect(
      lexar(`fun add(a: Integer, b: Integer): Void { a + b - 1 * 2389 }`)
    ).toEqual({
      context: {
        callStack: [],
        heap: {
          add: {
            arguments: [
              {
                name: "a",
                type: "argument",
                runtimeType: "Integer",
              },
              {
                name: "b",
                type: "argument",
                runtimeType: "Integer",
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
            returnType: "Void",
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
              runtimeType: "Integer",
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
                literalType: "integer",
                type: "literal",
                value: 2389,
              },
              type: "binary-expression",
            },
          ],
          name: "add",
          returnType: "Void",
          type: "function-declaration",
        },
      ],
    });
  });
});
