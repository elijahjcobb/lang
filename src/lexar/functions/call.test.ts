import { lexar } from "..";

describe("variables", () => {
  it("works on normal value", () => {
    expect(
      lexar(
        `let y: Integer = 1; fun add(a: Integer, b: Integer) { a + b - 1 * 2389 }; add(1, y)`
      )
    ).toBeDefined();
  });
});
