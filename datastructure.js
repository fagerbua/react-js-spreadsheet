import range from "lodash/range";

export const cell = value => ({ value });
export const column = cells => cells;
export const sheet = columns => columns;

const numberOfColumns = columns =>
  Math.max(...columns.map(column => column.length));

export const transpose = columns =>
  range(numberOfColumns(columns)).map(columnIndex =>
    range(columns.length).map(rowIndex => columns[rowIndex][columnIndex])
  );

export const editedSheet = (sheet, editedCell) =>
  sheet.map(
    (column, columnIndex) =>
      columnIndex === editedCell.columnIndex
        ? [
            ...column.slice(0, editedCell.rowIndex),
            cell(editedCell.value),
            ...column.slice(editedCell.rowIndex + 1)
          ]
        : column
  );

export const editedCell = args => ({
  rowIndex: args.rowIndex,
  columnIndex: args.columnIndex,
  value: args.value
});
