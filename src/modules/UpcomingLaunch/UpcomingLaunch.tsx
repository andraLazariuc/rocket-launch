import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";

import { GET_NEXT_LAUNCH_QUERY } from "../../api/graphql/queries/launches";
import navIconDown from "../../assets/downArrow.svg";
import CountDown from "../../components/CountDown/CountDown";
import { isDatePast } from "../../utils/timeFormatters";
import "./UpcomingLaunch.scss";

function UpcomingLaunch({ onNavIconClick }: { onNavIconClick?: () => void }) {
  const { loading, error, data, startPolling, stopPolling, refetch } = useQuery(
    GET_NEXT_LAUNCH_QUERY
  );

  useEffect(() => {
    startPolling(5000);

    return stopPolling;
  }, [startPolling, stopPolling]);

  if (loading)
    return (
      <div
        data-testid="upcoming-launch-loading"
        className="upcoming-launch-loading"
      >
        <h1>"Loading..."</h1>
      </div>
    );

  if (!!error)
    return (
      <div
        data-testid="upcoming-launch-error"
        className="upcoming-launch-error"
      >
        <h1>{`Error! ${error.message}`}</h1>
      </div>
    );

  const {
    launchNext: { mission_name: launchName, launch_date_utc: launchDate },
  } = data;

  const onDeadlineReached = () => refetch();

  // Unfortunately the api returns a date in the past from 2020, adding a date in the future
  const deadline = isDatePast(launchDate)
    ? "2022-12-06T16:17:00.000Z"
    : launchDate;

  return (
    <div data-testid="upcoming-launch" className="upcoming-launch">
      <h1 data-testid="upcoming-launch-title">Upcoming : {launchName}</h1>
      <CountDown deadline={deadline} onDeadlineReached={onDeadlineReached} />
      <div data-testid="nav-icon" className="nav-icon" onClick={onNavIconClick}>
        <img src={navIconDown} alt="go next" />
      </div>
    </div>
  );
}

export default UpcomingLaunch;
