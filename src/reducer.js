import {
  cell,
  column,
  computedSheet,
  sheet,
  editedSheet
} from "./datastructure";

const INITIAL_STATE = {
  sheet: sheet([
    column([cell(""), cell("")]),
    column([cell(""), cell("")]),
    column([cell(""), cell("")])
  ])
};

function reducer(state = INITIAL_STATE, action) {
  if (action.type === "CELL_EDITED") {
    return {
      ...state,
      sheet: computedSheet(editedSheet(state.sheet, action.payload.editedCell))
    };
  }
  return state;
}

export default reducer;
