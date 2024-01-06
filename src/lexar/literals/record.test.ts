import { lexar } from "..";

describe("record", () => {
  it("works on normal value", () => {
    expect(lexar(`{ hi: 1, b: true}`).statements).toEqual([
      {
        type: "literal",
        literalType: "Record",
        value: {
          b: {
            literalType: "Boolean",
            type: "literal",
            value: true,
          },
          hi: {
            literalType: "Integer",
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
          literalType: "Integer",
          type: "literal",
          value: 1,
        },
      },
      {
        literalType: "Record",
        type: "literal",
        value: {
          b: {
            literalType: "Boolean",
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
