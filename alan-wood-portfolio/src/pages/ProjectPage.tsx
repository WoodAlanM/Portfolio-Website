import { useState } from "react";
import MarkdownLoader from "../components/MarkdownLoader";
import CollapsibleScrollSpy from "../components/CollapsibleScrollSpy";

const ProjectPage = () => {
  const [selectedPost, setSelectedPost] = useState(
    "/assets/projectpage/markdown/desktop_assistant.md"
  );

  const handleTabClick = (newFilePath: string) => {
    setSelectedPost(newFilePath);
  };

  return (
    <>
      <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <a
            className="nav-link"
            onClick={() =>
              handleTabClick(
                "/assets/projectpage/markdown/desktop_assistant.md"
              )
            }
            aria-current="page"
            href="#"
          >
            Desktop Assistant
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            onClick={() =>
              handleTabClick(
                "/assets/projectpage/markdown/ir_blaster_program.md"
              )
            }
            aria-current="page"
            href="#"
          >
            IR Blaster Program
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="#">
            Page 2
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="#">
            Page 3
          </a>
        </li>
      </ul>
      <CollapsibleScrollSpy
        scrollSpyLocations={[
          "First heading",
          "Second heading",
          "Third heading",
        ]}
      />
      <div>
        <h1>My Blog Project</h1>
        <MarkdownLoader filePath={selectedPost} />
      </div>
    </>
  );
};

export default ProjectPage;
