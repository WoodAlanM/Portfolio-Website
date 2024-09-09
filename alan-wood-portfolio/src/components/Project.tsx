import React, { useState, useEffect } from "react";
import mammoth from "mammoth";

interface ProjectProps {
  filePath: string; // The filename passed as a prop
}

const Project: React.FC<ProjectProps> = ({ filePath }) => {
  const [fileContent, setFileContent] = useState<string>("");

  useEffect(() => {
    // Fetch the file from the /documents folder (relative path)
    const fetchDocument = async () => {
      try {
        const response = await fetch(`${filePath}`);
        if (!response.ok) {
          throw new Error("File not found");
        }    

        console.log("Response status: ", response.status, response.statusText)

        // Parse html with mammoth
        const arrayBuffer = await response.arrayBuffer();

        console.log("ArrayBuffer: ", arrayBuffer)

        // const result = await mammoth.convertToHtml({ arrayBuffer });

        const rawTextResult = await mammoth.extractRawText({ arrayBuffer });
        
        console.log("Mammoth result: ", rawTextResult)

        const parsedContent = parseContent(rawTextResult.value);
        const parsedForTabs = handleTabs(parsedContent)
        setFileContent(parsedForTabs);
      } catch (error) {
        console.error("Error fetching the document:", error);
      }
    };

    fetchDocument();
  }, [filePath]);

  // Function to parse the content for !!image-location!! markers
  const parseContent = (content: string) => {
    const imagePattern = /!!image-location!!='([^']+)'/g;

    // Replace image placeholders with <img> tags, assuming images are in the public folder or another directory
    return content.replace(imagePattern, (match, imagePath) => {
      return `<img src="${imagePath}" alt="Loaded Image" style="max-width: 100%;" />`;
    });
  };

  const handleTabs = (html: string) => {
    return html.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  };

  return (
    <div>
      <h2>{filePath}</h2>
      <div
        className="document-content"
        dangerouslySetInnerHTML={{ __html: fileContent }}
      />
    </div>
  );
};

export default Project;
