import React, { useState } from "react";
import Project from "../components/Project";

const ProjectPage = () => {
  const testPath = "../assets/projectpage/documents/test_project_from_ODT.docx"; // Your file in the /documents folder

  return (
    <div>
      <h1>My Blog Project</h1>
      <Project filePath={testPath} />
    </div>
  );
};

export default ProjectPage;
