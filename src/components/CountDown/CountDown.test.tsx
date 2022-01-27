import { cleanup, render, screen } from "@testing-library/react";

import CountDown from "./CountDown";

const testDate = new Date("2022-03-07T04:50:31.000Z");

afterEach(cleanup);

test("renders correctly", () => {
  render(<CountDown deadline={testDate} />);
  const countdownHtmlElement = screen.getByTestId("countdown");
  expect(countdownHtmlElement).toBeInTheDocument();
  expect(countdownHtmlElement).toHaveClass("countdown");
});

test("renders correct number of time units", () => {
  render(<CountDown deadline={testDate} />);
  const timeUnitHtmlElements = screen.getAllByTestId("time-unit");
  expect(timeUnitHtmlElements).toHaveLength(4);
});
