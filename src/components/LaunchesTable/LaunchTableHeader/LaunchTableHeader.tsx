import "./LaunchTableHeader.scss";

function LaunchTableHeader({ labels }: { labels: string[] }) {
  return (
    <div data-testid="launch-table-header" className="launch-table-header">
      {labels.map((label) => (
        <div
          data-testid="launch-header-label"
          className="launch-header-label"
          key={`label ${label}`}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

export default LaunchTableHeader;
