import * as React from "react";
import { connect } from "react-redux";
import range from "lodash/range";

const numberOfRows = columns =>
  Math.max(...columns.map(column => column.length));

const transpose = columns =>
  range(numberOfRows(columns)).map(rowIndex =>
    range(columns.length).map(columnIndex => columns[columnIndex][rowIndex])
  );

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

const Spreadsheet = p => (
  <table>
    <tbody>
      <tr>
        <th>&nbsp;</th>
        {range(p.columns.length).map(columnIndex => (
          <th key={`col-${columnIndex}`}>{columnIndex + 1}</th>
        ))}
      </tr>
      {transpose(p.columns).map((row, rowIndex) => (
        <tr key={`row-${rowIndex}`}>
          <th>{rowIndex + 1}</th>
          {row.map((column, columnIndex) => (
            <td key={`row-${rowIndex}-col-${columnIndex}`}>
              <Cell
                value={row[columnIndex].value}
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
  state => ({ columns: state.columns }),
  dispatch => ({
    updateCell: args => {
      dispatch({ type: "CELL_EDITED", payload: { ...args } });
    }
  })
)(Spreadsheet);

export const forTesting = { transpose };

export default ConnectedSpreadsheet;
