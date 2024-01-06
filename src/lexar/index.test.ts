import { lexar } from ".";

const SRC2 = `
1 + 2; 3 - 4;
5 + 45;
(1 + 2) * 3;
2 * 2;
1 / 3 * 3;
`;

const SRC = `
(1 + 2 + 3) + 4
`;

it("foo", () => {
  lexar(SRC);
});
