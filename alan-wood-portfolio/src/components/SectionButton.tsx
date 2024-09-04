import React, { useState, useEffect } from "react";
import resume from "../assets/homepage/resume.png";
import "../styles/homepage.css";

interface Props {
  leftPercent: number;
  topPercent: number;
  widthPercent: number;
  heightPercent: number;
  resumeTop: number;
  resumeLeft: number;
  width: number;
  height: number;
}

function SectionButton({
  leftPercent,
  topPercent,
  widthPercent,
  heightPercent,
  resumeTop,
  resumeLeft,
  width,
  height,
}: Props) {
  const selectResumeSection = (): React.CSSProperties => {
    return {
      position: "absolute",
      top: `${resumeTop}px`,
      left: `${resumeLeft}px`,
      width: `${width}px`,
      height: `${height}px`,
      overflow: "hidden",
    };
  };

  const backgroundPosition = (): React.CSSProperties => {
    return {
      //   backgroundImage: `url(${resume})`,
      //   backgroundPosition: `top left`,
      //   backgroundSize: `${width}px ${height}px`,
      left: `${resumeLeft + leftPercent * width}px`,
      top: `${resumeTop * topPercent}`,
      width: `${width}px`,
      height: `${height}px`,
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
