import React, { useState, useEffect, useRef } from "react";

interface Props {
    leftPercent: number;
    topPercent: number;
    widthPercent: number;
    heightPercent: number;
}


// Left off here
function SectionButton({ leftPercent, topPercent, widthPercent, heightPercent}: Props) {
    const resumeRef = useRef<HTMLImageElement | null>(null);
    const [resumeSize, setImageSize] = useState({ width: 0, height: 0 });
    const [resumeLeft, setResumeLeft] = useState(0);

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
          top: `${topPercent * resumeSize.height}px`,
          left: `${resumeLeft + leftPercent * resumeSize.width}px`,
          width: `${widthPercent * resumeSize.width}px`,
          height: `${heightPercent * resumeSize.height}px`,
        };
      };
}


export default SectionButton;
