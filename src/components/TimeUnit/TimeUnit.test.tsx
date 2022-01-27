import ReactDOM from "react-dom";
import { cleanup, render, screen } from "@testing-library/react";

import TimeUnit, { Unit } from "./TimeUnit";

const testProps = {
  time: 2,
  unit: Unit.Days,
};

afterEach(cleanup);

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TimeUnit {...testProps} />, div);
});

test("renders time unit correctly", () => {
  render(<TimeUnit {...testProps} />);
  const timeUnitHtmlElement = screen.getByTestId("time-unit");
  expect(timeUnitHtmlElement).toBeInTheDocument();
  expect(timeUnitHtmlElement).toHaveClass("time-unit");
  expect(timeUnitHtmlElement).toHaveTextContent(
    `${testProps.time}${testProps.unit}`
  );
});
