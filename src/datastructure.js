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

export const computedSheet = sheet =>
  sheet.map(column => computedColumn(column, sheet));
const computedColumn = (column, sheet) =>
  column.map(cell =>
    computedCell(cell.value, computedValue(cell.value, sheet))
  );

const computedValue = (value, sheet) => {
  if (value.length > 0 && value[0] === "=") {
    try {
      // eslint-disable-next-line
      const evaluated = eval(
        value
          .substr(1)
          .replace(
            /([A-Z]+)([0-9])+/g,
            (match, p1, p2) =>
              cellAtIndex(
                sheet,
                columnIndexFromLetter(p1),
                rowIndexFromNumber(p2)
              ).value
          )
      );
      return evaluated;
    } catch (e) {
      return e.toString();
    }
  } else return undefined;
};

export const computedCell = (enteredValue, computedValue) => ({
  value: enteredValue,
  computedValue
});

const cellAtIndex = (sheet, columnIndex, rowIndex) =>
  sheet[columnIndex][rowIndex];
const columnIndexFromLetter = letter => letter.charCodeAt(0) - 65;
const rowIndexFromNumber = number => number - 1;

export const editedCell = args => ({
  rowIndex: args.rowIndex,
  columnIndex: args.columnIndex,
  value: args.value
});

export const withAddedRow = sheet => sheet.map(column => [...column, cell("")]);
export const withAddedColumn = sheet => [
  ...sheet,
  column(sheet[0].reduce((prev, cur) => [...prev, cell("")], []))
];
