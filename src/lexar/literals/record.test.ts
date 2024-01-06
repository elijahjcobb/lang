import { lexar } from "..";

describe("record", () => {
  it("works on normal value", () => {
    expect(lexar(`{ hi: 1, b: true}`).statements).toEqual([
      {
        type: "literal",
        literalType: "record",
        value: {
          b: {
            literalType: "boolean",
            type: "literal",
            value: true,
          },
          hi: {
            literalType: "integer",
            type: "literal",
            value: 1,
          },
        },
      },
    ]);
  });
  it("works on var", () => {
    expect(lexar(`let x: Integer = 1; { hi: x, b: true}`).statements).toEqual([
      {
        isConstant: true,
        name: "x",
        runtimeType: "Integer",
        type: "variable-declaration",
        value: {
          literalType: "integer",
          type: "literal",
          value: 1,
        },
      },
      {
        literalType: "record",
        type: "literal",
        value: {
          b: {
            literalType: "boolean",
            type: "literal",
            value: true,
          },
          hi: {
            name: "x",
            type: "variable",
          },
        },
      },
      ,
    ]);
  });
});
