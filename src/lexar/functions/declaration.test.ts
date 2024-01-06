import { lexar } from "..";

describe("variables", () => {
  it("works on normal value", () => {
    console.log(
      JSON.stringify(lexar(`fun add(a, b) { 1 + a; a + b - 1 * c; }`), null, 4)
    );
  });
});
