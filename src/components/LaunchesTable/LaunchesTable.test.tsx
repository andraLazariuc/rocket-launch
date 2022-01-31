import ReactDOM from "react-dom";
import { cleanup, render, screen } from "@testing-library/react";

import LaunchesTable from "./LaunchesTable";

const testProps = {
  launches: [
    {
      mission_name: "Starlink 6",
      launch_date_utc: new Date("2022-11-06T16:17:00.000Z"),
      launchpad: "WBS",
      bookmarked: false,
    },
    {
      mission_name: "Starlink 7",
      launch_date_utc: new Date("2022-12-06T16:17:00.000Z"),
      launchpad: "KSC",
      bookmarked: false,
    },
  ],
};

afterEach(cleanup);

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LaunchesTable {...testProps} />, div);
});

test("renders correctly", async () => {
  render(<LaunchesTable {...testProps} />);
  const launchTableHtmlElement = await screen.findByTestId("launch-table");
  expect(launchTableHtmlElement).toBeInTheDocument();
  expect(launchTableHtmlElement).toHaveClass("launch-table");
});

test("renders a table header", () => {
  render(<LaunchesTable {...testProps} />);
  const launchTableHeaderHtmlElements = screen.getAllByTestId(
    "launch-table-header"
  );
  expect(launchTableHeaderHtmlElements).toHaveLength(1);
});

test("renders a table body", () => {
  render(<LaunchesTable {...testProps} />);
  const launchTableRowHtmlElements = screen.getAllByTestId("launch-row");
  expect(launchTableRowHtmlElements).toHaveLength(testProps.launches.length);
});
