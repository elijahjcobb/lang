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
              literalType: "String",
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
              literalType: "Integer",
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
  it("works on return integer variable", () => {
    expect(
      lexar(`
    let a: Integer = 32;
    fun a(): Integer { return a; }
    `).statements
    ).toEqual([
      {
        arguments: [],
        body: [
          {
            expression: {
              type: "literal",
              value: 42,
              literalType: "Integer",
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
  describe("assert types", () => {
    it("throw when the return type is not correct on literal", () => {
      expect(() =>
        lexar(`fun a(): Integer { return 'Hello, world!'; }`)
      ).toThrow();
    });
    it("throw when the return type is not correct on variable", () => {
      expect(() =>
        lexar(`
        let x: Boolean = true;
        fun a(): Integer { return x }`)
      ).toThrow();
    });
    it("throw when the return type is not Void and nothing is returned", () => {
      expect(() => lexar(`fun a(): Integer { return }`)).toThrow();
    });
  });
});
