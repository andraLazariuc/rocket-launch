import { act, cleanup, render, screen } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GET_NEXT_LAUNCH_QUERY } from "../../api/graphql/queries/launches";

import UpcomingLaunch from "./UpcomingLaunch";

const testDate = new Date("2022-03-07T04:50:31.000Z");
const testLaunch = {
  launch_date_utc: testDate,
  mission_name: "SXM-8",
};

const mockedGraphqlErrorText = "An error occurred";
const mockedQueryWithError = [
  {
    request: {
      query: GET_NEXT_LAUNCH_QUERY,
      variables: {},
    },
    error: new Error(mockedGraphqlErrorText),
  },
];
const mockedQuery = [
  {
    request: {
      query: GET_NEXT_LAUNCH_QUERY,
      variables: {},
    },
    result: {
      data: {
        launchNext: testLaunch,
      },
    },
  },
];

afterEach(cleanup);

test("renders correctly loading state", () => {
  const mocks = [] as
    | readonly MockedResponse<Record<string, any>>[]
    | undefined;
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UpcomingLaunch />
    </MockedProvider>
  );
  const upcomingLaunchHtmlElement = screen.getByTestId(
    "upcoming-launch-loading"
  );
  expect(upcomingLaunchHtmlElement).toBeInTheDocument();
  expect(upcomingLaunchHtmlElement).toHaveClass("upcoming-launch-loading");
  expect(upcomingLaunchHtmlElement).toHaveTextContent("Loading...");
});

test("renders correctly error state", async () => {
  render(
    <MockedProvider mocks={mockedQueryWithError} addTypename={false}>
      <UpcomingLaunch />
    </MockedProvider>
  );

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  const upcomingLaunchHtmlElement = screen.queryByTestId(
    "upcoming-launch-error"
  );
  expect(upcomingLaunchHtmlElement).toBeInTheDocument();
  expect(upcomingLaunchHtmlElement).toHaveClass("upcoming-launch-error");
  expect(upcomingLaunchHtmlElement).toHaveTextContent(
    `Error! ${mockedGraphqlErrorText}`
  );
});

test("renders correctly query success state", async () => {
  render(
    <MockedProvider mocks={mockedQuery} addTypename={false}>
      <UpcomingLaunch />
    </MockedProvider>
  );

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  const upcomingLaunchHtmlElement = screen.queryByTestId("upcoming-launch");
  expect(upcomingLaunchHtmlElement).toBeInTheDocument();
  expect(upcomingLaunchHtmlElement).toHaveClass("upcoming-launch");
});

test("renders a page title", async () => {
  render(
    <MockedProvider mocks={mockedQuery} addTypename={false}>
      <UpcomingLaunch />
    </MockedProvider>
  );

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  const titleHtmlElements = await screen.findAllByText(
    `Upcoming : ${testLaunch.mission_name}`
  );
  expect(titleHtmlElements).toHaveLength(1);
});

test("renders a countdown", async () => {
  render(
    <MockedProvider mocks={mockedQuery} addTypename={false}>
      <UpcomingLaunch />
    </MockedProvider>
  );

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  const countdownHtmlElements = screen.getAllByTestId("countdown");
  expect(countdownHtmlElements).toHaveLength(1);
});

// test("renders a navigation arrow", () => {
//   render(<UpcomingLaunch />);
//   const navigationIconHtmlElements = screen.getAllByTestId("nav-icon");
//   expect(navigationIconHtmlElements).toHaveLength(1);
// });
