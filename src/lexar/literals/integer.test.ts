import { lexar } from "..";

describe("integer", () => {
  it("works on positive", () => {
    expect(lexar(`42`).statements).toEqual([
      {
        type: "literal",
        literalType: "integer",
        value: 42,
      },
    ]);
  });
  it("works on negative", () => {
    expect(lexar(`-42`).statements).toEqual([
      {
        type: "literal",
        literalType: "integer",
        value: -42,
      },
    ]);
  });
});
