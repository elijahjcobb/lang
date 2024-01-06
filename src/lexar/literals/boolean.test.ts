import { lexar } from "..";

describe("boolean", () => {
  it("works on true", () => {
    expect(lexar(`true`)).toEqual([
      {
        type: "literal",
        literalType: "boolean",
        value: true,
      },
    ]);
  });
  it("works on false", () => {
    expect(lexar(`false`)).toEqual([
      {
        type: "literal",
        literalType: "boolean",
        value: false,
      },
    ]);
  });
});
