import * as ds from "./datastructure";

const INITIAL_STATE = {
  sheet: ds.sheet([
    ds.column([ds.cell(""), ds.cell("")]),
    ds.column([ds.cell(""), ds.cell("")]),
    ds.column([ds.cell(""), ds.cell("")])
  ])
};

function reducer(state = INITIAL_STATE, action) {
  if (action.type === "CELL_EDITED") {
    return {
      ...state,
      sheet: ds.computedSheet(
        ds.editedSheet(state.sheet, action.payload.editedCell)
      )
    };
  }
  if (action.type === "ADD_ROW_REQUESTED") {
    return { ...state, sheet: ds.withAddedRow(state.sheet) };
  }
  if (action.type === "ADD_COLUMN_REQUESTED") {
    return { ...state, sheet: ds.withAddedColumn(state.sheet) };
  }
  return state;
}

export default reducer;
