import React from "react";
import Project from "../components/Project";

const ParentComponent = () => {
  const fileName = "test_project_rtf.rtf"; // Your file in the /documents folder

  return (
    <div>
      <h1>My Blog Project</h1>
      <Project fileName={fileName} />
    </div>
  );
};

export default ParentComponent;
