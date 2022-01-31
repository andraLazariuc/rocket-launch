import ReactDOM from "react-dom";
import { cleanup, render, screen } from "@testing-library/react";

import LaunchRow from "./LaunchRow";
import { dateFormatingOptions } from "../../utils/timeFormatters";

const testProps = {
  mission_name: "Starlink 6",
  launch_date_utc: new Date("2022-12-06T16:17:00.000Z"),
  launchpad: "KSC",
  bookmarked: false,
};

const testPropsOrder = [
  "mission_name",
  "bookmarked",
  "launch_date_utc",
  "launchpad",
];

afterEach(cleanup);

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LaunchRow {...testProps} />, div);
});

test("renders launch row correctly", () => {
  render(<LaunchRow {...testProps} />);
  const launchRowHtmlElement = screen.getByTestId("launch-row");
  expect(launchRowHtmlElement).toBeInTheDocument();
  expect(launchRowHtmlElement).toHaveClass("launch-row");
});

test("renders data for 4 columns", () => {
  render(<LaunchRow {...testProps} />);
  const launchRowColumnHtmlElements = screen.getAllByTestId("launch-row-field");
  expect(launchRowColumnHtmlElements).toHaveLength(4);
});

test("renders correct data for 1st column", () => {
  render(<LaunchRow {...testProps} />);
  const launchRowColumnHtmlElements = screen.getAllByTestId("launch-row-field");
  expect(launchRowColumnHtmlElements[0]).toHaveTextContent(
    testProps.mission_name
  );
});

test("renders correct data for 2nd column", () => {
  render(<LaunchRow {...testProps} />);
  const launchRowColumnHtmlElements = screen.getAllByTestId("launch-row-field");

  expect(launchRowColumnHtmlElements[1]).toBeEmptyDOMElement();
});

test("renders correct data for 3rd column", () => {
  render(<LaunchRow {...testProps} />);
  const launchRowColumnHtmlElements = screen.getAllByTestId("launch-row-field");

  expect(launchRowColumnHtmlElements[2]).toHaveTextContent(
    testProps.launch_date_utc.toLocaleDateString("en-US", dateFormatingOptions)
  );
});

test("renders correct data for 4th column", () => {
  render(<LaunchRow {...testProps} />);
  const launchRowColumnHtmlElements = screen.getAllByTestId("launch-row-field");

  expect(launchRowColumnHtmlElements[3]).toHaveTextContent(testProps.launchpad);
});
