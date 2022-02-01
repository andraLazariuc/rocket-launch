import bookmarkIconFilled from "../../assets/star-filled.svg";
import bookmarkIconOutline from "../../assets/star-outline.svg";

import "./BookmarkIcon.scss";

function BookmarkIcon({
  bookmarked,
  onClick,
}: {
  bookmarked: boolean;
  onClick: () => void;
}) {
  return (
    <div
      data-testid="bookmark-icon"
      className="bookmark-icon"
      onClick={onClick}
    >
      {bookmarked && (
        <img
          src={bookmarkIconFilled}
          alt="bookmark"
          data-testid="bookmark-filled-icon"
        />
      )}
      {!bookmarked && (
        <img
          src={bookmarkIconOutline}
          alt="bookmark"
          data-testid="bookmark-outlined-icon"
        />
      )}
    </div>
  );
}
export default BookmarkIcon;
