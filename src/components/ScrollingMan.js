import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import bedImage from "./icons/bed.png";
import mouse from "./icons/mouse.png";

const ScrollingMan = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Set woman at top left
    const man = svg
      .append("image")
      .attr("href", mouse )
      .attr("x", 0) // Small offset from left edge
      .attr("y", 0) // Small offset from top edge
      .attr("width", 20)
      .attr("height", 20);

    // // Set bed at top right
    // const bed = svg
    //   .append("image")
    //   .attr("href", bedImage)
    //   .attr("x", window.innerWidth - 120) // 20px from right edge
    //   .attr("y", 20) // Small offset from top edge
    //   .attr("width", 100)
    //   .attr("height", 50);

    const updatePosition = () => {
      const scrollPercentage =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      const x = 20 + scrollPercentage * (window.innerWidth - 190); // Start from left (20) to right (near bed)
      const y = 20; // Keep y constant at top

      man.attr("x", x);
    };

    updatePosition(); // Set initial position

    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <section id="scrolling">
      <div className="scrolling-header">
        <svg
          ref={svgRef}
          width="100%"
          height="100vh"
          style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
        ></svg>
      </div>
    </section>
  );
};

export default ScrollingMan;
