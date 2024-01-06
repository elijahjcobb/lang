import { lexar } from "..";

describe("integer", () => {
  it("works on positive", () => {
    expect(lexar(`42`).statements).toEqual([
      {
        type: "literal",
        literalType: "Integer",
        value: 42,
      },
    ]);
  });
  it("works on negative", () => {
    expect(lexar(`-42`).statements).toEqual([
      {
        type: "literal",
        literalType: "Integer",
        value: -42,
      },
    ]);
  });
});
