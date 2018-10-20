import * as React from "react";
import { connect } from "react-redux";
import { transpose } from "./datastructure";
import range from "lodash/range";

const cellDimensions = { width: 100, height: 20 };

class Cell extends React.Component {
  constructor(props) {
    super();
    this.state = { editing: false, editedValue: props.enteredValue };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.editing && !prevState.editing) {
      this.inputRef.focus();
    }
  }
  render() {
    return (
      <div
        onClick={() => {
          if (!this.state.editing) {
            this.setState({ editing: true });
          }
        }}
        style={{
          ...cellDimensions,
          padding: "2px 5px",
          border: "1px solid black"
        }}
      >
        {this.state.editing ? (
          <input
            ref={ref => {
              this.inputRef = ref;
            }}
            type="text"
            style={{ ...cellDimensions, border: "none" }}
            value={this.state.editedValue}
            onChange={e => this.setState({ editedValue: e.target.value })}
            onBlur={() => {
              this.props.storeValue(this.state.editedValue);
              this.setState({ editing: false });
            }}
          />
        ) : (
          <span>{this.props.computedValue || this.props.enteredValue}</span>
        )}
      </div>
    );
  }
}

const columnHeadings = n =>
  range(n).map(index => String.fromCharCode(65 + index));

const Spreadsheet = p => (
  <table>
    <thead>
      <tr>
        <th>&nbsp;</th>
        {columnHeadings(p.columns.length).map(heading => (
          <th key={heading}>{heading}</th>
        ))}
        <th>
          <button id="add-column" onClick={p.addColumn}>
            +
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      {transpose(p.columns).map((row, rowIndex) => (
        <tr key={`row-${rowIndex}`}>
          <th>{rowIndex + 1}</th>
          {row.map((cell, columnIndex) => (
            <td key={`row-${rowIndex}-col-${columnIndex}`}>
              <Cell
                enteredValue={cell.value}
                computedValue={cell.computedValue}
                storeValue={value =>
                  p.updateCell({ columnIndex, rowIndex, value })
                }
              />
            </td>
          ))}
        </tr>
      ))}
      <tr>
        <td>
          <button id="add-row" onClick={p.addRow}>
            +
          </button>
        </td>
      </tr>
    </tbody>
  </table>
);

const ConnectedSpreadsheet = connect(
  state => ({ columns: state.sheet }),
  dispatch => ({
    updateCell: editedCell => {
      dispatch({ type: "CELL_EDITED", payload: { editedCell } });
    },
    addColumn: () => {
      dispatch({ type: "ADD_COLUMN_REQUESTED" });
    },
    addRow: () => {
      dispatch({ type: "ADD_ROW_REQUESTED" });
    }
  })
)(Spreadsheet);

export const forTesting = { Spreadsheet };

export default ConnectedSpreadsheet;
