import * as React from "react";
import * as Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { forTesting } from "./Spreadsheet";
import { column, computedCell, cell } from "./datastructure";

const { Spreadsheet } = forTesting;
Enzyme.configure({ adapter: new Adapter() });
describe("Spreadsheet UI", () => {
  it("displays each cell in a table", () => {
    const wrapper = Enzyme.mount(
      <Spreadsheet
        columns={[
          column([cell("A1"), cell("A2")]),
          column([cell("B1"), cell("B2")])
        ]}
      />
    );
    const rows = wrapper.find("tbody > tr");
    const cellsOfFirstRow = rows.at(0).find("Cell");
    const cellsOfSecondRow = rows.at(1).find("Cell");
    expect(cellsOfFirstRow.at(0).text()).toEqual("A1");
    expect(cellsOfFirstRow.at(1).text()).toEqual("B1");
    expect(cellsOfSecondRow.at(0).text()).toEqual("A2");
    expect(cellsOfSecondRow.at(1).text()).toEqual("B2");
  });
  it("displays the calculated value of a cell, if present", () => {
    const wrapper = Enzyme.mount(
      <Spreadsheet
        columns={[
          column([computedCell("22", undefined)]),
          column([computedCell("=A1", 22)])
        ]}
      />
    );
    const cells = wrapper.find("Cell");
    expect(cells.at(0).text()).toEqual("22");
    expect(cells.at(1).text()).toEqual("22");
  });
  describe("Selecting a cell by clicking", () => {
    it("turns the cell into an input field", () => {
      const wrapper = Enzyme.mount(
        <Spreadsheet columns={[column([cell("42")])]} />
      );
      expect(wrapper.find("input").exists()).toBe(false);
      wrapper.find("Cell").simulate("click");
      expect(wrapper.find("input").exists()).toBe(true);
    });
  });
});
