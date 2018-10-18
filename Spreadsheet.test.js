import { forTesting } from "./Spreadsheet";

describe("Matrix transposition", () => {
  const { transpose } = forTesting;
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
