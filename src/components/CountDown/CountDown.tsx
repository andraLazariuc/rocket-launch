import { useEffect, useState } from "react";
import { formatDateInTimeUnits } from "../../utils/timeFormatters";
import TimeUnit, { Unit } from "../TimeUnit/TimeUnit";

import "./CountDown.scss";

function CountDown({
  deadline,
  onDeadlineReached,
}: {
  deadline: Date;
  onDeadlineReached: () => void;
}) {
  const [deadlineInTimeUnits, setDeadlineInTimeUnits] = useState(
    formatDateInTimeUnits(deadline)
  );

  useEffect(() => {
    const isDeadlinePast =
      new Date().getTime() - new Date(deadline).getTime() <= 0;

    if (isDeadlinePast) {
      onDeadlineReached();
    }
  }, [deadline, onDeadlineReached]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDeadlineInTimeUnits(formatDateInTimeUnits(deadline));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [deadline]);

  return (
    <div data-testid="countdown" className="countdown">
      {Object.entries(deadlineInTimeUnits).map(([key, value]) => (
        <TimeUnit time={value} unit={key as Unit} key={`${value}${key}`} />
      ))}
    </div>
  );
}

export default CountDown;
