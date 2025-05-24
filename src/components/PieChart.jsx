import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../css/PieChart.css";

const PieChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    d3.select(chartRef.current).select("svg").remove();

    const width = 500;
    const height = 400;
    const radius = Math.min(width, height) / 2 - 40;

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible") // ensure labels are visible
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.label))
      .range(["#1890ff", "#ff4d4f", "#52c41a"]);

    const pie = d3.pie().value((d) => d.value);
    const data_ready = pie(data);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const outerArc = d3.arc().innerRadius(radius * 1.1).outerRadius(radius * 1.1);

    // Tooltip
    const tooltip = d3
      .select(chartRef.current)
      .append("div")
      .attr("class", "pie-tooltip")
      .style("opacity", 0);

    // Pie slices
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
        tooltip
          .html(
            `<strong>${d.data.label}</strong>: ${new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(d.data.value)}`
          )
          .style("opacity", 1)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    // Lines from slice to label
    svg
      .selectAll("polyline")
      .data(data_ready)
      .enter()
      .append("polyline")
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .attr("fill", "none")
      .attr("points", (d) => {
        const posA = arc.centroid(d); // slice center
        const posB = outerArc.centroid(d); // outside circle
        const posC = [...outerArc.centroid(d)];
        const midAngle = (d.startAngle + d.endAngle) / 2;
        posC[0] = radius * 1.3 * (midAngle < Math.PI ? 1 : -1); // move label away
        return [posA, posB, posC];
      });

    // Labels
    svg
      .selectAll("text")
      .data(data_ready)
      .enter()
      .append("text")
      .text(
        (d) =>
          `${d.data.label}: ${new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          }).format(d.data.value)}`
      )
      
      .attr("transform", (d) => {
        const pos = outerArc.centroid(d);
        const midAngle = (d.startAngle + d.endAngle) / 2;
        pos[0] = radius * 1.35 * (midAngle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style("text-anchor", (d) =>
        (d.startAngle + d.endAngle) / 2 < Math.PI ? "start" : "end"
      )
      .style("font-size", "12px")
      .style("fill", "#333");
  }, [data]);

  return (
    <div className="chart-card">
      <div className="chart-title">Financial Summary</div>
      <div ref={chartRef} className="pie-chart-container" />
    </div>
  );
};

export default PieChart;
