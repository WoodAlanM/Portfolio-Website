import React, { useState, useEffect, useRef } from "react";
import resume from "../assets/homepage/resume.png";
import "../styles/homepage.css";
import SectionButton from "../components/SectionButton";

function HomePage() {
  const resumeRef = useRef<HTMLImageElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [resumeSize, setImageSize] = useState({ width: 0, height: 0 });
  const [resumeLeft, setResumeLeft] = useState(0);
  const [resumeTop, setResumeTop] = useState(0);

  useEffect(() => {
    setIsVisible(true);

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

  const calculateHighlightStyle = (
    topPercent: number,
    leftPercent: number,
    widthPercent: number,
    heightPercent: number
  ): React.CSSProperties => {
    return {
      top: `${topPercent * resumeSize.height}px`,
      left: `${resumeLeft + leftPercent * resumeSize.width}px`,
      width: `${widthPercent * resumeSize.width}px`,
      height: `${heightPercent * resumeSize.height}px`,
    };
  };

  return (
    <>
      <div className="container text-center">
        <SectionButton
          resumeLeft={resumeLeft}
          resumeTop={resumeTop}
          width={resumeSize.width}
          height={resumeSize.height}
          topPercent={0.2225}
          leftPercent={0.41}
          widthPercent={0.5}
          heightPercent={0.11}
        />
        <div className="image-container">
          <img
            src={resume}
            alt="Alan Wood Resume"
            className={`full-height-image ${isVisible ? "fade-in" : ""}`}
            ref={resumeRef}
          />
          <div
            className="highlight highlight-profile"
            style={calculateHighlightStyle(0.2225, 0.41, 0.5, 0.11)}
          ></div>
          <div
            className="highlight highlight-work"
            style={calculateHighlightStyle(0.34, 0.41, 0.5, 0.53)}
          ></div>
          <div
            className="highlight highlight-certifications"
            style={calculateHighlightStyle(0.877, 0.41, 0.5, 0.1)}
          ></div>
          <div
            className="highlight highlight-contact"
            style={calculateHighlightStyle(0.2225, 0.1, 0.29, 0.145)}
          ></div>
          <div
            className="highlight highlight-skills"
            style={calculateHighlightStyle(0.38, 0.1, 0.29, 0.155)}
          ></div>
          <div
            className="highlight highlight-education"
            style={calculateHighlightStyle(0.55, 0.1, 0.29, 0.21)}
          ></div>
          <div
            className="highlight highlight-languages"
            style={calculateHighlightStyle(0.7725, 0.1, 0.29, 0.205)}
          ></div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
