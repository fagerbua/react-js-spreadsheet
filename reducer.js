const cell = value => ({ value });
const row = () => [cell("bla"), cell("blo"), cell("ble")];
const INITIAL_STATE = {
  columns: [row(), row(), row()]
};

function reducer(state = INITIAL_STATE, action) {
  if (action.type === "CELL_EDITED") {
    return {
      ...state,
      columns: state.columns.map(
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
