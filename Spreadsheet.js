import * as React from "react";
import { connect } from "react-redux";
import { transpose } from "./datastructure";
import range from "lodash/range";

class Cell extends React.Component {
  constructor(props) {
    super();
    this.state = { displayedValue: props.value };
  }
  render() {
    return (
      <input
        type="text"
        value={this.state.displayedValue}
        onChange={e => this.setState({ displayedValue: e.target.value })}
        onBlur={() => this.props.storeValue(this.state.displayedValue)}
      />
    );
  }
}

const columnHeadings = n =>
  range(n).map(index => String.fromCharCode(65 + index));

const Spreadsheet = p => (
  <table>
    <tbody>
      <tr>
        <th>&nbsp;</th>
        {columnHeadings(p.columns.length).map(heading => (
          <th key={heading}>{heading}</th>
        ))}
      </tr>
      {transpose(p.columns).map((row, rowIndex) => (
        <tr key={`row-${rowIndex}`}>
          <th>{rowIndex + 1}</th>
          {row.map((cell, columnIndex) => (
            <td key={`row-${rowIndex}-col-${columnIndex}`}>
              <Cell
                value={cell.value}
                storeValue={value =>
                  p.updateCell({ columnIndex, rowIndex, value })
                }
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const ConnectedSpreadsheet = connect(
  state => ({ columns: state.sheet }),
  dispatch => ({
    updateCell: editedCell => {
      dispatch({ type: "CELL_EDITED", payload: { editedCell } });
    }
  })
)(Spreadsheet);

export const forTesting = { transpose };

export default ConnectedSpreadsheet;
