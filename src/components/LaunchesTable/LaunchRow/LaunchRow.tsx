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
      <div data-testid="launch-row-field" className="launch-row-field">
        {mission_name}
      </div>
      <div data-testid="launch-row-field" className="launch-row-field">
        {/* {bookmarked && starIcon} */}
      </div>
      <div data-testid="launch-row-field" className="launch-row-field">
        {/* TODO: check date format */}
        {new Date(launch_date_utc).toLocaleDateString(
          "en-US",
          dateFormatingOptions
        )}
      </div>
      <div data-testid="launch-row-field" className="launch-row-field">
        {launchpad}
      </div>
    </div>
  );
}

export default LaunchRow;
