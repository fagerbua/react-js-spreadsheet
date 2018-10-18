import range from "lodash/range";

export const cell = value => ({ value });
export const row = cells => cells;
export const sheet = columns => columns;

const numberOfRows = columns =>
  Math.max(...columns.map(column => column.length));

export const transpose = columns =>
  range(numberOfRows(columns)).map(rowIndex =>
    range(columns.length).map(columnIndex => columns[columnIndex][rowIndex])
  );

export const modifiedSheet = (sheet, editedCell) =>
  sheet.map(
    (row, columnIndex) =>
      columnIndex === editedCell.columnIndex
        ? [
            ...row.slice(0, editedCell.rowIndex),
            cell(editedCell.value),
            ...row.slice(editedCell.rowIndex + 1)
          ]
        : row
  );
