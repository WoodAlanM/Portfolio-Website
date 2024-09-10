import { useState } from "react";
import MarkdownLoader from "../components/MarkdownLoader";
import ScrollSpy from "../components/ScrollSpy";
import "../styles/projectpage.css";

const ProjectPage = () => {
  const [selectedPost, setSelectedPost] = useState(
    "/assets/projectpage/markdown/desktop_assistant.md"
  );
  const [blogTitle, setBlogTitle] = useState("");

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
      </ul>

      <div
        className="page-scroll-area"
        data-bs-spy="scroll"
        data-bs-target="#scrollspy-list"
        data-bs-smooth-scroll="true"
        tabIndex={0}
      >
        <ScrollSpy
          scrollSpyLocations={[
            "First heading",
            "Second heading",
            "Third heading",
          ]}
        />
        <div className="blog-content">
          <MarkdownLoader filePath={selectedPost} />
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
