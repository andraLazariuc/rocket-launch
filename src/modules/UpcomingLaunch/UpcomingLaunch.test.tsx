import { act, cleanup, render, screen } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GET_NEXT_LAUNCH_QUERY } from "../../api/graphql/queries/launches";

import UpcomingLaunch from "./UpcomingLaunch";

const testLaunch = {
  mission_name: "SXM-7",
  launch_date_utc: new Date("2022-12-13T17:30:00.000Z"),
};

const mockedGraphqlErrorText = "An error occurred";
const mockedQueryWithError = [
  {
    request: {
      query: GET_NEXT_LAUNCH_QUERY,
    },
    error: new Error(mockedGraphqlErrorText),
  },
];
const mockedQuery = [
  {
    request: {
      query: GET_NEXT_LAUNCH_QUERY,
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

  const upcomingLaunchHtmlElement = await screen.findByTestId(
    "upcoming-launch"
  );

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

  const countdownHtmlElements = await screen.findAllByTestId("countdown");
  expect(countdownHtmlElements).toHaveLength(1);
});

test("renders a navigation arrow", async () => {
  render(
    <MockedProvider mocks={mockedQuery} addTypename={false}>
      <UpcomingLaunch />
    </MockedProvider>
  );

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  const navigationIconHtmlElements = await screen.findAllByTestId("nav-icon");
  expect(navigationIconHtmlElements).toHaveLength(1);
});
