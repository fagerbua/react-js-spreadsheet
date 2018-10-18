import * as React from "react";
import { connect } from "react-redux";
import range from "lodash/range";

const numberOfRows = columns =>
  Math.max(...columns.map(column => column.length));

const transpose = columns =>
  range(numberOfRows(columns)).map(rowIndex =>
    range(columns.length).map(columnIndex => columns[columnIndex][rowIndex])
  );

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
              {row[columnIndex].value}
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

export const forTesting = { transpose };

export default ConnectedSpreadsheet;
