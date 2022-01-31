import "./LaunchTableHeader.scss";

function LaunchTableHeader({ labels }: { labels: string[] }) {
  return (
    <div data-testid="launch-table-header" className="launch-table-header">
      {labels.map((label) => (
        <span
          data-testid="launch-header-label"
          className="launch-header-label"
          key={`label ${label}`}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

export default LaunchTableHeader;
