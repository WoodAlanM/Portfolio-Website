import React, { useState, useEffect } from "react";
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
  className?: string;
  style?: React.CSSProperties;
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
  className,
  style,
}: Props) {
  const [resumeSize, setImageSize] = useState({ width: 0, height: 0 });
  const [resumeLeft, setResumeLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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

    updateImageSize();

    return () => window.removeEventListener("resize", updateImageSize);
  }, []);

  const imageContainerCSS = (): React.CSSProperties => {
    return {
      opacity: 0,
      position: `absolute`,
      boxShadow: `${backgroundOffsetX * -1}px ${
        backgroundOffsetY * -1
      }px 15px black`,
      border: `1px solid black`,
      top: `${topPercent * resumeSize.height + backgroundOffsetY}px`,
      left: `${
        resumeLeft + leftPercent * resumeSize.width + backgroundOffsetX
      }px`,
      width: `${widthPercent * resumeSize.width}px`,
      height: `${heightPercent * resumeSize.height}px`,
      overflow: `hidden`,
      backgroundImage: `url(${resume})`,
      backgroundSize: `${resumeSize.width}px ${resumeSize.height}px`,
      backgroundPosition: `calc(${leftPercent * 100}% + ${offsetX}px) calc(${
        topPercent * 100
      }% - ${offsetY}px)`,
      transform: isHovered ? `scale(1.2)` : `scale(1)`,
      zIndex: isHovered ? 20 : 10,
      transition: `all 0.5s ease`,
      ...style,
    };
  };

  return (
    <>
      <div className="hover-div">
        <div
          className={`section-button ${className || ""}`}
          style={imageContainerCSS()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        ></div>
      </div>
    </>
  );
}

export default SectionButton;
