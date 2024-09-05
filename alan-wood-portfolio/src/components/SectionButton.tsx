import React, { useState, useEffect, useRef } from "react";
import resume from "../assets/homepage/resume.png";
import "../styles/homepage.css";

interface Props {
  topPercent: number;
  leftPercent: number;
  widthPercent: number;
  heightPercent: number;
  resumeRef: React.RefObject<HTMLImageElement>;
}

function SectionButton({
  topPercent,
  leftPercent,
  widthPercent,
  heightPercent,
  resumeRef,
}: Props) {
  const [resumeSize, setImageSize] = useState({ width: 0, height: 0 });
  const [resumeLeft, setResumeLeft] = useState(0);
  const [resumeTop, setResumeTop] = useState(0);

  useEffect(() => {
    const updateImageSize = () => {
      if (resumeRef.current) {
        const rect = resumeRef.current.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(resumeRef.current);
        setImageSize({
          width: rect.width,
          height: rect.height,
        });
        setResumeLeft(parseFloat(computedStyle.marginLeft));
        setResumeTop(parseFloat(computedStyle.marginTop));
      }
    };

    // Need to make it update on page reload

    // Update the size after the image has loaded
    if (resumeRef.current) {
      if (resumeRef.current.complete) {
        updateImageSize();
      } else {
        resumeRef.current.onload = updateImageSize;
      }
    }

    // Update the size on window resize
    window.addEventListener("resize", updateImageSize);

    return () => window.removeEventListener("resize", updateImageSize);
  }, []);

  const selectResumeSection = (): React.CSSProperties => {
    return {
      position: "absolute",
      top: `${topPercent * resumeSize.height}px`,
      left: `${resumeLeft + leftPercent * resumeSize.width}px`,
      width: `${widthPercent * resumeSize.width}px`,
      height: `${heightPercent * resumeSize.height}px`,
      backgroundColor: `brown`,
      opacity: 0.5,
      zIndex: 10,
      objectFit: `cover`,
      overflow: "hidden",
    };
  };

  const backgroundPosition = (): React.CSSProperties => {
    return {
      backgroundImage: `url(${resume})`,
      backgroundPosition: `top left`,
      left: `${resumeLeft}px`,
      top: `${resumeTop}`,
      width: `${resumeSize.width}`,
      height: `${resumeSize.height}`,
    };
  };

  return (
    <>
      <div className="section-button-container">
        <div className="section-button" style={selectResumeSection()}>
          <img
            src={resume}
            className="resume-section"
            style={backgroundPosition()}
          />
        </div>
      </div>
    </>
  );
}

export default SectionButton;
