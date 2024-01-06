import { lexar } from "..";

describe("return", () => {
  it("throw when return is by itself", () => {
    expect(() => lexar(`return`)).toThrow();
  });
  it("works on empty return", () => {
    expect(lexar(`fun a(): Void { return }`).statements).toEqual([
      {
        arguments: [],
        body: [
          {
            expression: null,
            type: "return-expression",
          },
        ],
        name: "a",
        returnType: "Void",
        type: "function-declaration",
      },
    ]);
  });
  it("works on return string literal", () => {
    expect(lexar(`fun a(): String { return 'hi' }`).statements).toEqual([
      {
        arguments: [],
        body: [
          {
            expression: {
              type: "literal",
              value: "hi",
              literalType: "string",
            },
            type: "return-expression",
          },
        ],
        name: "a",
        returnType: "String",
        type: "function-declaration",
      },
    ]);
  });
  it("works on return integer literal", () => {
    expect(lexar(`fun a(): Integer { return 42; }`).statements).toEqual([
      {
        arguments: [],
        body: [
          {
            expression: {
              type: "literal",
              value: 42,
              literalType: "integer",
            },
            type: "return-expression",
          },
        ],
        name: "a",
        returnType: "Integer",
        type: "function-declaration",
      },
    ]);
  });
  // it.only("throw when the return type is not correct", () => {
  //   expect(() =>
  //     lexar(`fun a(): Integer { return 'Hello, world!'; }`)
  //   ).toThrow();
  // });
});
