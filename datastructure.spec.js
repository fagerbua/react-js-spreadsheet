import { cell, editedSheet, row, sheet, transpose } from "./datastructure";

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
      row([cell("A1"), cell("A2")]),
      row([cell("B1"), cell("B2")]),
      row([cell("C2"), cell("C2")])
    ]);
    expect(
      editedSheet(testSheet, {
        columnIndex: 0,
        rowIndex: 1,
        value: "A2 changed"
      })
    ).toEqual(
      sheet([
        row([cell("A1"), cell("A2 changed")]),
        row([cell("B1"), cell("B2")]),
        row([cell("C2"), cell("C2")])
      ])
    );
  });
});
