import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DonutChart = ({ usedPercent, totalBudget = 100, title }) => {
  const chartRef = useRef();

  useEffect(() => {
    d3.select(chartRef.current).select("svg").remove();
    d3.select(chartRef.current).select(".donut-tooltip").remove();

    const width = 400;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 30;

    const data = [
      { label: "Expenses (used)", value: usedPercent },
      { label: "Remaining", value: 100 - usedPercent },
    ];

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible")
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.label))
      .range(["#ff4d4f", "#d9d9d9"]);

    const pie = d3.pie().value((d) => d.value);
    const data_ready = pie(data);

    const arc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    // Tooltip div positioned absolutely inside container
    const tooltip = d3
      .select(chartRef.current)
      .append("div")
      .attr("class", "donut-tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background", "rgba(0,0,0,0.7)")
      .style("color", "#fff")
      .style("padding", "6px 10px")
      .style("border-radius", "4px")
      .style("font-size", "13px")
      .style("pointer-events", "none")
      .style("transform", "translate(-50%, -100%)") // center horizontally, position above

    svg
      .selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .on("mouseover", (event, d) => {
        const actualValue = ((d.data.value / 100) * totalBudget).toFixed(0);
        tooltip
          .html(
            `<strong>${d.data.label}</strong><br/>
             ${d.data.value}%<br/>
             ₹${actualValue}`
          )
          .style("opacity", 1);

        // Calculate position for tooltip based on arc centroid
        const [x, y] = arc.centroid(d);

        // Because svg group is centered in the div, position tooltip relative to container center + centroid
        tooltip.style("left", `${width / 2 + x}px`).style("top", `${height / 2 + y - 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    // Center Text
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.2em")
      .style("font-size", "36px")
      .style("font-weight", "bold")
      .text(`${usedPercent}%`);

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.2em")
      .style("font-size", "16px")
      .style("fill", "#555")
      .text("used");
  }, [usedPercent, totalBudget]);

  return (
    <div style={{ position: "relative" }} className="chart-card">
      <div className="chart-title">{title}</div>
      <div ref={chartRef} className="pie-chart-container" />
    </div>
  );
};

export default DonutChart;
