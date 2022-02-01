import ReactDOM from "react-dom";
import { act, cleanup, render, screen } from "@testing-library/react";

import LaunchRow from "./LaunchRow";
import { dateFormatingOptions } from "../../../utils/timeFormatters";
import { GET_BOOKMARKED_LAUNCHES_QUERY } from "../../../api/graphql/queries";
import { MockedProvider } from "@apollo/client/testing";

const testProps = {
  launch: {
    id: "id",
    mission_name: "Starlink 6",
    launch_date_utc: new Date("2022-12-06T16:17:00.000Z"),
    launchpad: "KSC",
  },
};

const mocks = [
  {
    request: {
      query: GET_BOOKMARKED_LAUNCHES_QUERY,
    },
    result: {
      data: {
        bookmarks: [],
      },
    },
  },
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
    testProps.launch.mission_name
  );
});

test("renders correct data for 2nd column", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LaunchRow {...testProps} />
    </MockedProvider>
  );

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  const launchRowColumnHtmlElements = screen.queryByTestId(
    "bookmark-outlined-icon"
  );

  expect(launchRowColumnHtmlElements).toBeInTheDocument();
});

test("renders correct data for 3rd column", () => {
  render(<LaunchRow {...testProps} />);
  const launchRowColumnHtmlElements = screen.getAllByTestId("launch-row-field");

  expect(launchRowColumnHtmlElements[2]).toHaveTextContent(
    testProps.launch.launch_date_utc.toLocaleDateString(
      "en-US",
      dateFormatingOptions
    )
  );
});

test("renders correct data for 4th column", () => {
  render(<LaunchRow {...testProps} />);
  const launchRowColumnHtmlElements = screen.getAllByTestId("launch-row-field");

  expect(launchRowColumnHtmlElements[3]).toHaveTextContent(
    testProps.launch.launchpad
  );
});
