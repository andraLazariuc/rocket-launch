import { cleanup, render, screen } from "@testing-library/react";

import UpcomingLaunch from "./UpcomingLaunch";

const testDate = new Date("2022-03-07T04:50:31.000Z");
const testLaunch = {
  launchDate: testDate,
  launchName: "SXM-8",
};

afterEach(cleanup);

test("renders correctly", () => {
  render(<UpcomingLaunch {...testLaunch} />);
  const upcomingLaunchHtmlElement = screen.getByTestId("upcoming-launch");
  expect(upcomingLaunchHtmlElement).toBeInTheDocument();
  expect(upcomingLaunchHtmlElement).toHaveClass("upcoming-launch");
});

test("renders a page title", () => {
  render(<UpcomingLaunch {...testLaunch} />);
  const titleHtmlElements = screen.getAllByText(
    `Upcoming: ${testLaunch.launchName}`
  );
  expect(titleHtmlElements).toHaveLength(1);
});

test("renders a countdown", () => {
  render(<UpcomingLaunch {...testLaunch} />);
  const countdownHtmlElements = screen.getAllByTestId("countdown");
  expect(countdownHtmlElements).toHaveLength(1);
});

test("renders a navigation arrow", () => {
  render(<UpcomingLaunch {...testLaunch} />);
  const navigationIconHtmlElements = screen.getAllByTestId("nav-icon");
  expect(navigationIconHtmlElements).toHaveLength(1);
});
