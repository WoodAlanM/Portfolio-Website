// src/components/MarkdownLoader.js
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownLoaderProps {
  filePath: string;
}

const MarkdownLoader = ({ filePath }: MarkdownLoaderProps) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(filePath)
      .then((response) => response.text())
      .then((text) => {
        // Process custom syntax
        const processedText = text.replace(
          /!!image-path!!="([^"]+)"/g,
          '<img src="$1" alt="Image" />'
        );
        const processedForTitle = processedText.replace(
          /!!page-title!!="([^"]+)"/g,
          '<h1 class="blog-title">$1</h1>'
        );
        setContent(processedForTitle);
      })
      .catch((error) => console.error("Error loading Markdown file:", error));
  }, [filePath]);

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // Apply remark-gfm for GitHub-flavored Markdown
        rehypePlugins={[rehypeRaw]} // Allow raw HTML
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownLoader;
