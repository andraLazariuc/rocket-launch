import "./TimeUnit.scss";

export enum Unit {
  Days = "DAYS",
  Hours = "HOURS",
  Minutes = "MINUTES",
  Seconds = "SECONDS",
}

function TimeUnit({ time, unit }: { time: number; unit: Unit }) {
  return (
    <div data-testid="time-unit" className="time-unit">
      <span>{time}</span>
      <span className="unit">{unit}</span>
    </div>
  );
}

export default TimeUnit;
