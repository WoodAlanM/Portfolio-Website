import React, { useState, useEffect } from "react";

interface ProjectProps {
  fileName: string; // The filename passed as a prop
}

const Project: React.FC<ProjectProps> = ({ fileName }) => {
  const [fileContent, setFileContent] = useState<string>("");

  let documentPath = "../assets/projectpage/documents/";

  useEffect(() => {
    // Fetch the file from the /documents folder (relative path)
    const fetchDocument = async () => {
      try {
        const response = await fetch(`/${documentPath}/${fileName}`);
        if (!response.ok) {
          throw new Error("File not found");
        }
        const text = await response.text();
        const parsedContent = parseContent(text); // Parse and replace image markers
        setFileContent(parsedContent);
      } catch (error) {
        console.error("Error fetching the document:", error);
      }
    };

    fetchDocument();
  }, [fileName]);

  // Function to parse the content for !!image-location!! markers
  const parseContent = (content: string) => {
    const imagePattern = /!!image-location!!='([^']+)'/g;

    // Replace image placeholders with <img> tags, assuming images are in the public folder or another directory
    return content.replace(imagePattern, (match, imagePath) => {
      return `<img src="${imagePath}" alt="Loaded Image" style="max-width: 100%;" />`;
    });
  };

  return (
    <div>
      <h2>{fileName}</h2>
      <div
        className="document-content"
        dangerouslySetInnerHTML={{ __html: fileContent }}
      />
    </div>
  );
};

export default Project;
