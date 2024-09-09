import React, { useState, useEffect, useRef } from "react";
import resume from "../assets/homepage/resume.png";
import "../styles/homepage.css";
import SectionButton from "../components/SectionButton";

function HomePage() {
  const resumeRef = useRef<HTMLImageElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [resumeSize, setImageSize] = useState({ width: 0, height: 0 });
  const [resumeLeft, setResumeLeft] = useState(0);

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
    // delay: number
  ): React.CSSProperties => {
    return {
      top: `${topPercent * resumeSize.height}px`,
      left: `${resumeLeft + leftPercent * resumeSize.width}px`,
      width: `${widthPercent * resumeSize.width}px`,
      height: `${heightPercent * resumeSize.height}px`,
      // animationDelay: `${delay}s`
    };
  };

  return (
    <>
      <div className="container text-center">
        <div className="image-container">
          {/* Contact section button */}
          <SectionButton
            topPercent={0.22}
            leftPercent={0.1}
            widthPercent={0.29}
            heightPercent={0.145}
            resumeRef={resumeRef}
            backgroundOffsetX={-20}
            backgroundOffsetY={-20}
            offsetX={-20}
            offsetY={-20}
            className="delayed-fade-in"
            style={{ "--fade-delay": "4s" } as React.CSSProperties}
          />
          {/* Skills section button */}
          <SectionButton
            topPercent={0.38}
            leftPercent={0.1}
            widthPercent={0.29}
            heightPercent={0.155}
            resumeRef={resumeRef}
            backgroundOffsetX={-20}
            backgroundOffsetY={-8}
            offsetX={-20}
            offsetY={6}
            className="delayed-fade-in"
            style={{ "--fade-delay": "4s" } as React.CSSProperties}
          />
          {/* Education section button */}
          <SectionButton
            topPercent={0.55}
            leftPercent={0.1}
            widthPercent={0.29}
            heightPercent={0.21}
            resumeRef={resumeRef}
            backgroundOffsetX={-20}
            backgroundOffsetY={11}
            offsetX={-20}
            offsetY={50}
            className="delayed-fade-in"
            style={{ "--fade-delay": "4s" } as React.CSSProperties}
          />
          {/* Languages section button */}
          <SectionButton
            topPercent={0.7725}
            leftPercent={0.1}
            widthPercent={0.29}
            heightPercent={0.205}
            resumeRef={resumeRef}
            backgroundOffsetX={-20}
            backgroundOffsetY={15}
            offsetX={-20}
            offsetY={89}
            className="delayed-fade-in"
            style={{ "--fade-delay": "4s" } as React.CSSProperties}
          />
          {/* Profile section button */}
          <SectionButton
            topPercent={0.2225}
            leftPercent={0.41}
            widthPercent={0.5}
            heightPercent={0.11}
            resumeRef={resumeRef}
            backgroundOffsetX={20}
            backgroundOffsetY={-22}
            offsetX={-133}
            offsetY={-30}
            className="delayed-fade-in"
            style={{ "--fade-delay": "4s" } as React.CSSProperties}
          />
          {/* Work section button */}
          <SectionButton
            topPercent={0.34}
            leftPercent={0.41}
            widthPercent={0.5}
            heightPercent={0.53}
            resumeRef={resumeRef}
            backgroundOffsetX={20}
            backgroundOffsetY={-7}
            offsetX={-133}
            offsetY={110}
            className="delayed-fade-in"
            style={{ "--fade-delay": "4s" } as React.CSSProperties}
          />
          {/* Certifications section button */}
          <SectionButton
            topPercent={0.877}
            leftPercent={0.41}
            widthPercent={0.5}
            heightPercent={0.1}
            resumeRef={resumeRef}
            backgroundOffsetX={20}
            backgroundOffsetY={16}
            offsetX={-133}
            offsetY={25}
            className="delayed-fade-in"
            style={{ "--fade-delay": "4s" } as React.CSSProperties}
          />
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
