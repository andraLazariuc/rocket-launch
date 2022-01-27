import CountDown from "../../components/CountDown/CountDown";
import "./UpcomingLaunch.scss";

function UpcomingLaunch({
  launchName,
  launchDate,
}: {
  launchName: string;
  launchDate: Date;
}) {
  return (
    <div data-testid="upcoming-launch" className="upcoming-launch">
      <h1>Upcoming: {launchName}</h1>
      <CountDown deadline={launchDate} />
      {/* TODO: add arrow-down icon */}
      <div data-testid="nav-icon" />
    </div>
  );
}

export default UpcomingLaunch;
