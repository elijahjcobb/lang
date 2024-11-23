import { transpile } from ".";

describe("transpiler", () => {
  it("const int literal", () => {
    expect(
      transpile({
        context: {
          callStack: [],
          heap: {},
        },
        statements: [
          {
            type: "variable-declaration",
            isConstant: true,
            name: "foo",
            runtimeType: "Integer",
            value: {
              type: "literal",
              literalType: "Integer",
              value: 1234,
            },
          },
        ],
      })
    ).toEqual("const int foo = 1234;");
  });
});
