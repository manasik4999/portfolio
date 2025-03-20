import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { csv } from "d3-fetch";
import "../App.css";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const histogramRef = useRef(null);
  const pieChartRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    show: false,
    content: "",
    x: 0,
    y: 0,
  });

  useEffect(() => {
    csv("./skills.csv")
      .then((data) => {
        const parsedData = data.map((d) => ({
          ...d,
          YearsExperience: +d.YearsExperience,
          Projects: +d.Projects,
        }));
        setSkills(parsedData);
      })
      .catch((error) => console.error("Error loading CSV:", error));
  }, []);

  
  useEffect(() => {
    if (skills.length > 0) {
      console.log("Skills data loaded:", skills);
      createHistogram();
      createPieChart();
    }
  }, [skills]);

  const createHistogram = () => {
    d3.select(histogramRef.current).selectAll("*").remove();
    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(histogramRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(skills.map((d) => d.Category))
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(skills, (d) => d.YearsExperience)])
      .range([height, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll("mybar")
      .data(skills)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.Category))
      .attr("y", (d) => y(d.YearsExperience))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.YearsExperience))
      .attr("fill", "#69b3a2")
      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr("fill", "#3e8e41");
        setTooltip({
          show: true,
          content: `Skill: ${d.Skill}<br>Proficiency: ${d.Proficiency}<br>Years: ${d.YearsExperience}<br>Projects: ${d.Projects}`,
          x: event.pageX,
          y: event.pageY,
        });
      })
      .on("mouseout", (event) => {
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr("fill", "#69b3a2");
        setTooltip({ show: false, content: "", x: 0, y: 0 });
      });

    // Add labels
    svg
      .selectAll(".text")
      .data(skills)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => x(d.Category) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.YearsExperience) - 5)
      .attr("text-anchor", "middle")
      .text((d) => d.YearsExperience);
  };

  const createPieChart = () => {
    d3.select(pieChartRef.current).selectAll("*").remove();
    const width = 450;
    const height = 450;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(pieChartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(skills.map((d) => d.Category))
      .range(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.Projects);

    const data_ready = pie(skills);

    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

    svg
      .selectAll("mySlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => color(d.data.Category))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr("transform", `scale(1.1)`);
        setTooltip({
          show: true,
          content: `Category: ${d.data.Category}<br>Skill: ${d.data.Skill}<br>Proficiency: ${d.data.Proficiency}<br>Years: ${d.data.YearsExperience}<br>Projects: ${d.data.Projects}`,
          x: event.pageX,
          y: event.pageY,
        });
      })
      .on("mouseout", (event) => {
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr("transform", `scale(1)`);
        setTooltip({ show: false, content: "", x: 0, y: 0 });
      });

    // Add labels
    svg
      .selectAll("mySlices")
      .data(data_ready)
      .enter()
      .append("text")
      .text((d) => d.data.Category)
      .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", 12);
  };

  return (
    <section id="skills" style={{ padding: "20px" }}>
      <div className="skills-container">
        <h2 className="skills-heading" style={{ color: "white" }}>
          My Skills
        </h2>
        <div
          className="charts-container"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <div ref={histogramRef}></div>
          <div ref={pieChartRef}></div>
        </div>
      </div>
      {tooltip.show && (
        <div
          style={{
            position: "absolute",
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            background: "white",
            padding: "5px",
            border: "1px solid black",
            borderRadius: "5px",
            pointerEvents: "none",
          }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}
    </section>
  );
};

export default Skills;
