import * as Enzyme from "enzyme";
import * as React from "react";

import { cell, column, computedCell } from "./datastructure";

import Adapter from "enzyme-adapter-react-16";
import { forTesting } from "./Spreadsheet";

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
  describe("Adding rows and columns", () => {
    it("can be done by clicking buttons", () => {
      const addColumn = jest.fn();
      const addRow = jest.fn();
      const wrapper = Enzyme.mount(
        <Spreadsheet
          columns={[
            column([cell("A1"), cell("A2")]),
            column([cell("B1"), cell("B2")])
          ]}
          addColumn={addColumn}
          addRow={addRow}
        />
      );
      wrapper.find("#add-row").simulate("click");
      wrapper.find("#add-column").simulate("click");
      expect(addColumn).toHaveBeenCalledTimes(1);
      expect(addRow).toHaveBeenCalledTimes(1);
    });
  });
  describe("Selecting a cell by double-clicking", () => {
    it("turns the cell into an input field", () => {
      const wrapper = Enzyme.mount(
        <Spreadsheet columns={[column([cell("42")])]} />
      );
      expect(wrapper.find("input").exists()).toBe(false);
      wrapper.find("Cell").simulate("doubleClick");
      expect(wrapper.find("input").exists()).toBe(true);
    });
    it("focuses the input field", () => {
      const wrapper = Enzyme.mount(
        <Spreadsheet columns={[column([cell("42"), cell("edit me")])]} />
      );
      wrapper
        .find("Cell")
        .at(1)
        .simulate("doubleClick");
      expect(document.activeElement.value).toEqual("edit me");
    });
  });
  describe("Editing a cell", () => {
    it("can be finished by pressing Enter", () => {
      const wrapper = Enzyme.mount(
        <Spreadsheet columns={[column([cell("42")])]} updateCell={() => ({})} />
      );
      wrapper.find("Cell").simulate("doubleClick");
      wrapper.find("Cell input").simulate("keyDown", { key: "Enter" });
      expect(wrapper.find("input").exists()).toBe(false);
    });
    it("can be finished by leaving the input element", () => {
      const wrapper = Enzyme.mount(
        <Spreadsheet columns={[column([cell("42")])]} updateCell={() => ({})} />
      );
      wrapper.find("Cell").simulate("doubleClick");
      wrapper.find("Cell input").simulate("blur");
      expect(wrapper.find("input").exists()).toBe(false);
    });
    it("focuses the input field", () => {
      const wrapper = Enzyme.mount(
        <Spreadsheet columns={[column([cell("42"), cell("edit me")])]} />
      );
      wrapper
        .find("Cell")
        .at(1)
        .simulate("doubleClick");
      expect(document.activeElement.value).toEqual("edit me");
    });
  });
});
