import { interpret } from ".";
import { lexar } from "../lexar";

it("foo", () => {
  interpret(lexar(`let x: Integer = 1;`));
});
