import { formatDateInTimeUnits } from "../../utils/timeFormatters";
import TimeUnit, { Unit } from "../TimeUnit/TimeUnit";

function CountDown({ deadline }: { deadline: Date }) {
  const deadlineInTimeUnits = formatDateInTimeUnits(deadline);

  return (
    <div data-testid="countdown" className="countdown">
      {Object.entries(deadlineInTimeUnits).map(([key, value]) => (
        <TimeUnit time={value} unit={key as Unit} />
      ))}
    </div>
  );
}

export default CountDown;
