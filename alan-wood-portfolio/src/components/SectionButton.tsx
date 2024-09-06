import React, { useState, useEffect, useRef } from "react";
import resume from "../assets/homepage/resume.png";
import "../styles/homepage.css";

interface Props {
  topPercent: number;
  leftPercent: number;
  widthPercent: number;
  heightPercent: number;
  resumeRef: React.RefObject<HTMLImageElement>;
  backgroundOffsetX: number;
  backgroundOffsetY: number;
  offsetX: number;
  offsetY: number;
}

function SectionButton({
  topPercent,
  leftPercent,
  widthPercent,
  heightPercent,
  resumeRef,
  backgroundOffsetX,
  backgroundOffsetY,
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

  let locationTop = resumeTop + offsetX;
  let locationLeft = resumeLeft + offsetY;

  const sectionButtonContainerCSS = (): React.CSSProperties => {
    return {
      backgroundRepeat: `no-repeat`,
      zIndex: 10,
    };
  };

  const imageContainerCSS = (): React.CSSProperties => {
    return {
      zIndex: 10,
      position: `absolute`,
      boxShadow: `${backgroundOffsetX * -1}px ${backgroundOffsetY * -1}px 15px black`,
      border: `1px solid black`,
      top: `${topPercent * resumeSize.height + backgroundOffsetY}px`,
      left: `${resumeLeft + leftPercent * resumeSize.width + backgroundOffsetX}px`,
      width: `${widthPercent * resumeSize.width}px`,
      height: `${heightPercent * resumeSize.height}px`,
      overflow: `hidden`,  // Hide any overflow
      backgroundImage: `url(${resume})`,  // Set the image here too
      backgroundSize: `${resumeSize.width}px ${resumeSize.height}px`,  // Same size as parent
      // backgroundPosition: `calc(50% + ${offsetX}px) calc(50% + ${offsetY}px)`,
      backgroundPosition: `calc(${leftPercent * 100}% + ${offsetX}px) calc(${topPercent * 100}% - ${offsetY}px)`,
    };
  };

  return (
    <>
      <div className="hover-div">
        <div className="section-button" style={imageContainerCSS()}>

        </div>      
      </div>
    </>
  );
}

export default SectionButton;
