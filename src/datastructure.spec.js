import {
  cell,
  column,
  computedCell,
  computedSheet,
  editedSheet,
  sheet,
  transpose
} from "./datastructure";

describe("Matrix transposition", () => {
  test("transpose function turns rows into columns", () => {
    const columns = [
      [{ value: "col-1-row-1" }, { value: "col-1-row-2" }],
      [{ value: "col-2-row-1" }, { value: "col-2-row-2" }]
    ];
    expect(transpose(columns)).toEqual([
      [{ value: "col-1-row-1" }, { value: "col-2-row-1" }],
      [{ value: "col-1-row-2" }, { value: "col-2-row-2" }]
    ]);
  });
});

describe("Spreadsheet", () => {
  it("can be edited by calling a function that returns a new spreadsheet", () => {
    const testSheet = sheet([
      column([cell("A1"), cell("A2")]),
      column([cell("B1"), cell("B2")]),
      column([cell("C2"), cell("C2")])
    ]);
    expect(
      editedSheet(testSheet, {
        columnIndex: 0,
        rowIndex: 1,
        value: "A2 changed"
      })
    ).toEqual(
      sheet([
        column([cell("A1"), cell("A2 changed")]),
        column([cell("B1"), cell("B2")]),
        column([cell("C2"), cell("C2")])
      ])
    );
  });
  it("can have its cells computed", () => {
    const testSheet = sheet([
      column([cell("1"), cell("2")]),
      column([cell("=A1+A2"), cell("=A1-A2")])
    ]);
    expect(computedSheet(testSheet)).toEqual(
      sheet([
        column([computedCell("1", undefined), computedCell("2", undefined)]),
        column([computedCell("=A1+A2", 3), computedCell("=A1-A2", -1)])
      ])
    );
  });
});
