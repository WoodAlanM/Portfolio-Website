import "../styles/collapsiblescrollspy.css";

interface CollapsibleScrollSpyProps {
  scrollSpyLocations: string[];
}

function CollapsibleScrollSpy({
  scrollSpyLocations,
}: CollapsibleScrollSpyProps) {
  return (
    <div className="collapsible-container">
      <div className={`collapsible-box`}>
        {/* Content of the collapsible box */}
        <div
          data-bs-spy="scroll"
          data-bs-target="#navbar-example2"
          data-bs-root-margin="0px 0px -40%"
          data-bs-smooth-scroll="true"
          className="scrollspy-example bg-body-tertiary p-4 rounded-2"
          tabIndex={0}
        >
          {scrollSpyLocations.map((item, index) => (
            <h5 key={index} id={`scrollIndex${index}`}>
              {item}
            </h5>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CollapsibleScrollSpy;
