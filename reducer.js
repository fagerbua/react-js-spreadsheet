const cell = value => ({ value });
const row = () => [cell("bla"), cell("blo"), cell("ble")];
const INITIAL_STATE = {
  columns: [row(), row(), row()]
};

function reducer(state = INITIAL_STATE, action) {
  return state;
}

export default reducer;
