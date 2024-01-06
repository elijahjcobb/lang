import { lexar } from "..";

describe("float", () => {
  it("works on positive", () => {
    expect(lexar(`3.14`).statements).toEqual([
      {
        type: "literal",
        literalType: "Float",
        value: 3.14,
      },
    ]);
  });
  it("works on negative", () => {
    expect(lexar(`-3.14`).statements).toEqual([
      {
        type: "literal",
        literalType: "Float",
        value: -3.14,
      },
    ]);
  });
});
