import { cleanup, render, screen } from "@testing-library/react";

import CountDown from "./CountDown";

const testDate = new Date("2022-03-07T04:50:31.000Z");
const mockedRefatch = () => void 0;
const testProps = {
  deadline: testDate,
  onDeadlineReached: mockedRefatch,
};

afterEach(cleanup);

test("renders correctly", () => {
  render(<CountDown {...testProps} />);
  const countdownHtmlElement = screen.getByTestId("countdown");
  expect(countdownHtmlElement).toBeInTheDocument();
  expect(countdownHtmlElement).toHaveClass("countdown");
});

test("renders correct number of time units", () => {
  render(<CountDown {...testProps} />);
  const timeUnitHtmlElements = screen.getAllByTestId("time-unit");
  expect(timeUnitHtmlElements).toHaveLength(4);
});
