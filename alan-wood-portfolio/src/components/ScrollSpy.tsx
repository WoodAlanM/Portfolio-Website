import "../styles/scrollspy.css";

interface CollapsibleScrollSpyProps {
  scrollSpyLocations: string[];
}

function CollapsibleScrollSpy({
  scrollSpyLocations,
}: CollapsibleScrollSpyProps) {
  return (
    <div className="scrollspy-container">
      <div className="scrollspy-box">
        {/* Content of the collapsible box */}
        <div id="scrollspy-list" className="list-group">
          {scrollSpyLocations.map((item, index) => (
            <a
              key={index}
              className="list-group-item list-group-item-action"
              href={`#heading-${index}`}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CollapsibleScrollSpy;
