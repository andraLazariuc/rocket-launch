import ReactDOM from "react-dom";
import { cleanup, render, screen } from "@testing-library/react";

import LaunchTableHeader from "./LaunchTableHeader";
import { tableHeaderLabels } from "../LaunchesTable";

afterEach(cleanup);

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LaunchTableHeader labels={tableHeaderLabels} />, div);
});

test("renders launch row correctly", () => {
  render(<LaunchTableHeader labels={tableHeaderLabels} />);
  const launchRowHtmlElement = screen.getByTestId("launch-table-header");
  expect(launchRowHtmlElement).toBeInTheDocument();
  expect(launchRowHtmlElement).toHaveClass("launch-table-header");
});

test("renders data for 4 columns", () => {
  render(<LaunchTableHeader labels={tableHeaderLabels} />);
  const launchHeaderLabelHtmlElements = screen.getAllByTestId(
    "launch-header-label"
  );
  expect(launchHeaderLabelHtmlElements).toHaveLength(4);
});

test("renders correct data for 1st column", () => {
  render(<LaunchTableHeader labels={tableHeaderLabels} />);
  const launchHeaderLabelHtmlElements = screen.getAllByTestId(
    "launch-header-label"
  );
  expect(launchHeaderLabelHtmlElements[0]).toHaveTextContent(
    tableHeaderLabels[0]
  );
});

test("renders correct data for 2nd column", () => {
  render(<LaunchTableHeader labels={tableHeaderLabels} />);
  const launchHeaderLabelHtmlElements = screen.getAllByTestId(
    "launch-header-label"
  );

  expect(launchHeaderLabelHtmlElements[1]).toBeEmptyDOMElement();
});

test("renders correct data for 3rd column", () => {
  render(<LaunchTableHeader labels={tableHeaderLabels} />);
  const launchHeaderLabelHtmlElements = screen.getAllByTestId(
    "launch-header-label"
  );

  expect(launchHeaderLabelHtmlElements[2]).toHaveTextContent(
    tableHeaderLabels[2]
  );
});

test("renders correct data for 4th column", () => {
  render(<LaunchTableHeader labels={tableHeaderLabels} />);
  const launchHeaderLabelHtmlElements = screen.getAllByTestId(
    "launch-header-label"
  );

  expect(launchHeaderLabelHtmlElements[3]).toHaveTextContent(
    tableHeaderLabels[3]
  );
});
