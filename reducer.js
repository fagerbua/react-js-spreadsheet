import { cell, column, sheet, editedSheet } from "./datastructure";

const INITIAL_STATE = {
  sheet: sheet([
    column([cell("A1"), cell("A2")]),
    column([cell("B1"), cell("B2")]),
    column([cell("C2"), cell("C2")])
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
