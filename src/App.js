import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Spreadsheet from "./Spreadsheet";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Spreadsheet />
      </Provider>
    );
  }
}

export default App;
