import { useQuery } from "@apollo/client";
import { useEffect } from "react";

import { GET_UPCOMING_LAUNCHES_QUERY } from "../../api/graphql/queries/launches";
import navIconUp from "../../assets/upArrow.svg";
import LaunchesTable from "../../components/LaunchesTable/LaunchesTable";
import "./Launches.scss";

export type UpcomingLaunch = {
  id: string;
  mission_name: string;
  launch_site: {
    site_name: string;
  };
  launch_date_utc: Date;
};

function Launches({ onNavIconClick }: { onNavIconClick?: () => void }) {
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_UPCOMING_LAUNCHES_QUERY
  );

  useEffect(() => {
    startPolling(5000);

    return stopPolling;
  }, [startPolling, stopPolling]);

  if (loading)
    return (
      <div
        data-testid="upcoming-launches-loading"
        className="upcoming-launches-loading"
      >
        <h1>"Loading..."</h1>
      </div>
    );

  if (!!error)
    return (
      <div
        data-testid="upcoming-launches-error"
        className="upcoming-launches-error"
      >
        <h1>{`Error! ${error.message}`}</h1>
      </div>
    );

  const { launchesUpcoming } = data;

  const formatLaunches = (launches: UpcomingLaunch[]) =>
    launches.map((launch: any) => {
      const { id, mission_name, launch_date_utc, launch_site } = launch;

      return {
        // API is sending launches with same id
        id: `${id}-${mission_name}`,
        mission_name,
        launch_date_utc,
        launchpad: launch_site.site_name,
      };
    });

  const launches = formatLaunches(launchesUpcoming);

  return (
    <div data-testid="launches" className="launches">
      <h1 data-testid="launches-title">Upcoming - Next Launches</h1>
      <LaunchesTable launches={launches} />
      <div data-testid="nav-icon" className="nav-icon" onClick={onNavIconClick}>
        <img src={navIconUp} alt="go next" />
      </div>
    </div>
  );
}

export default Launches;
