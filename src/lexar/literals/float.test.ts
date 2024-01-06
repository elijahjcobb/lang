import { lexar } from "..";

describe("float", () => {
  it("works on positive", () => {
    expect(lexar(`3.14`)).toEqual([
      {
        type: "literal",
        literalType: "float",
        value: 3.14,
      },
    ]);
  });
  it("works on negative", () => {
    expect(lexar(`-3.14`)).toEqual([
      {
        type: "literal",
        literalType: "float",
        value: -3.14,
      },
    ]);
  });
});
