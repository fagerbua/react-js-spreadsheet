import {
  cell,
  column,
  computedCell,
  computedSheet,
  editedSheet,
  sheet,
  transpose,
  withAddedColumn,
  withAddedRow
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
  describe("Modifying dimensions", () => {
    test("Adding a column", () => {
      const testSheet = sheet([
        column([cell("A1"), cell("A2")]),
        column([cell("B1"), cell("B2")]),
        column([cell("C2"), cell("C2")])
      ]);
      expect(withAddedColumn(testSheet)).toEqual(
        sheet([
          column([cell("A1"), cell("A2")]),
          column([cell("B1"), cell("B2")]),
          column([cell("C2"), cell("C2")]),
          column([cell(""), cell("")])
        ])
      );
    });
    test("Adding a row", () => {
      const testSheet = sheet([
        column([cell("A1"), cell("A2")]),
        column([cell("B1"), cell("B2")]),
        column([cell("C2"), cell("C2")])
      ]);
      expect(withAddedRow(testSheet)).toEqual(
        sheet([
          column([cell("A1"), cell("A2"), cell("")]),
          column([cell("B1"), cell("B2"), cell("")]),
          column([cell("C2"), cell("C2"), cell("")])
        ])
      );
    });
  });
  describe("Editing", () => {
    it("works by changing one cell at a time", () => {
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
  });
  describe("Computations", () => {
    it("works for simple JS expressions, substituting cell values", () => {
      const testSheet = sheet([
        column([cell("1"), cell("2")]),
        column([cell("=Math.max(A1, A2)"), cell("=A1-A2")])
      ]);
      expect(computedSheet(testSheet)).toEqual(
        sheet([
          column([computedCell("1", undefined), computedCell("2", undefined)]),
          column([
            computedCell("=Math.max(A1, A2)", 2),
            computedCell("=A1-A2", -1)
          ])
        ])
      );
    });
    it("works with lowercase as well as uppercase cell references", () => {
      const testSheet = sheet([
        column([cell("1"), cell("2")]),
        column([cell("=A1+A2"), cell("=a1+a2")])
      ]);
      expect(computedSheet(testSheet)).toEqual(
        sheet([
          column([computedCell("1", undefined), computedCell("2", undefined)]),
          column([computedCell("=A1+A2", 3), computedCell("=a1+a2", 3)])
        ])
      );
    });
    it("allows a computed cell value to depend on the value of another computed value", () => {
      const testSheet = sheet([
        column([cell("1"), cell("=A1+1"), cell("=A2+1")])
      ]);
      expect(computedSheet(testSheet)).toEqual(
        sheet([
          column([
            computedCell("1", undefined),
            computedCell("=A1+1", 2),
            computedCell("=A2+1", 3)
          ])
        ])
      );
    });
  });
});
