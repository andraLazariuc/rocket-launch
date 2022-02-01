import { useReactiveVar } from "@apollo/client";
import { useState } from "react";

import { bookmarksVar } from "../../../api/graphql/cache";
import { dateFormatingOptions } from "../../../utils/timeFormatters";
import BookmarkIcon from "../../BookmarkIcon/BookmarkIcon";
import { Launch } from "../LaunchesTable";
import "./LaunchRow.scss";

function LaunchRow({ launch }: { launch: Launch }) {
  const { id, mission_name, launch_date_utc, launchpad } = launch;
  const bookmarks = useReactiveVar(bookmarksVar);
  const [bookmarked, setBookmarked] = useState(bookmarks.includes(id));

  const bookmarkLaunch = (launchId: string) => {
    if (!bookmarked) {
      bookmarksVar([...bookmarks, id]);

      setBookmarked(true);
      return;
    }

    const updatedBookmarks = bookmarks.filter((id) => id !== launchId);
    bookmarksVar(updatedBookmarks);
    setBookmarked(false);
  };

  return (
    <div data-testid="launch-row" className="launch-row">
      <div data-testid="launch-row-field" className="launch-row-field">
        {mission_name}
      </div>
      <div data-testid="launch-row-field" className="launch-row-field">
        <BookmarkIcon
          bookmarked={bookmarked}
          onClick={() => bookmarkLaunch(id)}
        />
      </div>
      <div data-testid="launch-row-field" className="launch-row-field">
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
