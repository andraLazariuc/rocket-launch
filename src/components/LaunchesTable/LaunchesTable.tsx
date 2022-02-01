import TableHeader from "./LaunchTableHeader/LaunchTableHeader";
import TableRow from "./LaunchRow/LaunchRow";
import "./LaunchesTable.scss";

export type Launch = {
  id: string;
  mission_name: string;
  launch_date_utc: Date;
  launchpad: string;
  bookmarked?: boolean;
};

export const tableHeaderLabels = ["Mission name", "", "Date(UTC)", "Launchpad"];

function LaunchesTable({ launches }: { launches: Launch[] }) {
  return (
    <div data-testid="launch-table" className="launch-table">
      <TableHeader labels={tableHeaderLabels} />
      {launches &&
        launches.map((launch) => (
          <TableRow launch={launch} key={launch.mission_name} />
        ))}
    </div>
  );
}

export default LaunchesTable;
