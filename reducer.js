import { cell, row, sheet, editedSheet } from "./datastructure";

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
      sheet: editedSheet(state.sheet, action.payload.editedCell)
    };
  }
  return state;
}

export default reducer;
