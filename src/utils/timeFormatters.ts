import { Unit } from "../components/TimeUnit/TimeUnit";

const DAY_UNIT_IN_SECONDS = 24 * 60 * 60;
const HOUR_UNIT_IN_SECONDS = 60 * 60;

export const formatDateInTimeUnits = (deadline: Date) => {
  let diffInSeconds = Math.abs(new Date(deadline).getTime() - new Date().getTime()) / 1000;

  const days = Math.floor(diffInSeconds / DAY_UNIT_IN_SECONDS);
  diffInSeconds -= days * DAY_UNIT_IN_SECONDS;

  const hours = Math.floor(diffInSeconds / HOUR_UNIT_IN_SECONDS) % 24;
  diffInSeconds -= hours * HOUR_UNIT_IN_SECONDS;

  const minutes = Math.floor(diffInSeconds / 60) % 60;
  diffInSeconds -= minutes * 60;

  const seconds = Math.floor(diffInSeconds) % 60;

  return {
    [Unit.Days]: days,
    [Unit.Hours]: hours,
    [Unit.Minutes]: minutes,
    [Unit.Seconds]: seconds,
  };
};

export const isDatePast = (date: Date) => {
  return new Date(date).getTime() - new Date().getTime() <= 0;
}
