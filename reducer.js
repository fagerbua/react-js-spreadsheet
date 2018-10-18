import { cell, row, sheet } from "./datastructure";

const INITIAL_STATE = {
  sheet: sheet([
    row([cell("A1"), cell("A2")]),
    row([cell("B1"), cell("B2")]),
    row([cell("C2"), cell("C2")])
  ])
};

function reducer(state = INITIAL_STATE, action) {
  if (action.type === "CELL_EDITED") {
    return {
      ...state,
      sheet: state.sheet.map(
        (row, columnIndex) =>
          columnIndex === action.payload.columnIndex
            ? [
                ...row.slice(0, action.payload.rowIndex),
                cell(action.payload.value),
                ...row.slice(action.payload.rowIndex + 1)
              ]
            : row
      )
    };
  }
  return state;
}

export default reducer;
