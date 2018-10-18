import * as React from "react";
import { connect } from "react-redux";
import range from "lodash/range";

const numberOfRows = columns =>
  Math.max(...columns.map(column => column.length));

const Spreadsheet = p => (
  <table>
    <tbody>
      <tr>
        <th>&nbsp;</th>
        {range(p.columns.length).map(columnIndex => (
          <th key={`col-${columnIndex}`}>{columnIndex + 1}</th>
        ))}
      </tr>
      {range(numberOfRows(p.columns)).map(rowIndex => (
        <tr key={`row-${rowIndex}`}>
          <th>{rowIndex + 1}</th>
          {range(p.columns.length).map(columnIndex => (
            <td key={`row-${rowIndex}-col-${columnIndex}`}>
              {p.columns[columnIndex][rowIndex].value}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const ConnectedSpreadsheet = connect(state => ({ columns: state.columns }))(
  Spreadsheet
);

export default ConnectedSpreadsheet;
