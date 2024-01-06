import { lexar } from "..";

describe("string", () => {
  it("works on normal value", () => {
    expect(lexar(`'hello, world!'`)).toEqual([
      {
        type: "literal",
        literalType: "string",
        value: "hello, world!",
      },
    ]);
  });
  it("works on empty string", () => {
    expect(lexar(`''`)).toEqual([
      {
        type: "literal",
        literalType: "string",
        value: "",
      },
    ]);
  });
});
