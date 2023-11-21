import React, { useEffect, useRef, useState } from "react";
import Trianglify from "trianglify";

const TrianglifyBackground = ({ color1, color2 }) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;

    // Check if the container has a valid size
    if (container.clientWidth === 0 || container.clientHeight === 0) {
      // Container has no size, wait for it to become available
      const handleResize = () => {
        setContainerSize({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    // Create a Trianglify pattern with the specified options
    const pattern = Trianglify({
      width: containerSize.width,
      height: containerSize.height,
      xColors: [color1, color2], // Set the gradient colors
      seed: "your-seed-here", // Replace with your desired seed or null for randomness
    });

    // Get the SVG pattern and append it to the container
    const svgPattern = pattern.toSVG();
    container.appendChild(svgPattern);

    // Cleanup effect when component unmounts
    return () => {
      container.removeChild(svgPattern);
    };
  }, [color1, color2, containerSize]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      {/* This div will serve as the container for the Trianglify canvas */}
    </div>
  );
};

export default TrianglifyBackground;
