import { lexar } from "..";

describe("string", () => {
  it("works on normal value", () => {
    expect(lexar(`'hello, world!'`).statements).toEqual([
      {
        type: "literal",
        literalType: "string",
        value: "hello, world!",
      },
    ]);
  });
  it("works on empty string", () => {
    expect(lexar(`''`).statements).toEqual([
      {
        type: "literal",
        literalType: "string",
        value: "",
      },
    ]);
  });
});
