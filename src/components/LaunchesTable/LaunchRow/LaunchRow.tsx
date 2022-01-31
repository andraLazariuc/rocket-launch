import { dateFormatingOptions } from "../../../utils/timeFormatters";
import { Launch } from "../LaunchesTable";
import "./LaunchRow.scss";

function LaunchRow({ launch }: { launch: Launch }) {
  const {
    mission_name,
    launch_date_utc,
    launchpad,
    bookmarked = false,
  } = launch;

  return (
    <div data-testid="launch-row" className="launch-row">
      <span data-testid="launch-row-field" className="launch-column-mission">
        {mission_name}
      </span>
      <span data-testid="launch-row-field" className="launch-column-bookmark">
        {/* {bookmarked && starIcon} */}
      </span>
      <span data-testid="launch-row-field" className="launch-column-date">
        {/* TODO: check date format */}
        {launch_date_utc.toLocaleDateString("en-US", dateFormatingOptions)}
      </span>
      <span data-testid="launch-row-field" className="launch-column-launchpad">
        {launchpad}
      </span>
    </div>
  );
}

export default LaunchRow;
