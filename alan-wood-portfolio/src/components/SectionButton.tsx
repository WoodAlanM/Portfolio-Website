import React, { useState, useEffect, useRef } from "react";
import resume from "../assets/homepage/resume.png";
import "../styles/homepage.css";

interface Props {
  topPercent: number;
  leftPercent: number;
  widthPercent: number;
  heightPercent: number;
  resumeRef: React.RefObject<HTMLImageElement>;
  offsetX: number;
  offsetY: number;
}

function SectionButton({
  topPercent,
  leftPercent,
  widthPercent,
  heightPercent,
  resumeRef,
  offsetX,
  offsetY,
  // Add offsets x, y
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
      boxShadow: `${-offsetX / 2}px ${-offsetY / 2}px 10px black`,
      top: `${topPercent * resumeSize.height + offsetY}px`,
      left: `${resumeLeft + leftPercent * resumeSize.width + offsetX}px`,
      width: `${widthPercent * resumeSize.width}px`,
      height: `${heightPercent * resumeSize.height}px`,
      opacity: 1,
      border: `1px solid black`,
      zIndex: 10,
      objectFit: `none`,
      overflow: "hidden",
    };
  };

  const backgroundPosition = (): React.CSSProperties => {
    let widthCenter = (resumeSize.width * widthPercent) / 2;
    let heightCenter = (resumeSize.height * heightPercent) / 2;

    console.log(widthCenter)
    console.log(heightCenter)

    return {
      width: `${resumeSize.width}px`,
      height: `${resumeSize.height}px`,
      objectFit: `cover`,
      objectPosition: `${-widthCenter * (1 - leftPercent) - offsetX}px ${heightCenter * (1 - topPercent) + topPercent * resumeSize.height * -1}px`,
    };
  };

  return (
    <>
      <div className="section-button-container">
        <div className="">
          <div className="section-button" style={selectResumeSection()}>
            <img
              src={resume}
              className="resume-section"
              style={backgroundPosition()}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionButton;
