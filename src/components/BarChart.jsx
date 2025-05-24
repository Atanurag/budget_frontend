import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../css/BarChart.css"; // Make sure this file includes updated styles below

const BarChart = ({ chartData, xLabel, yLabel, title }) => {
  const chartRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select(chartRef.current).select("svg").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("width", "100%")
      .style("height", "auto")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.2)
      .domain(chartData.map((d) => d.name));

    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(chartData, (d) => d.value)]);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "12px");

    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "12px");

    // X-axis label
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .attr("class", "axis-label")
      .text(xLabel);

    // Y-axis label
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(-90)`)
      .attr("x", -height / 2)
      .attr("y", -margin.left + 15)
      .attr("class", "axis-label")
      .text(yLabel);

    const tooltip = d3
      .select(chartRef.current)
      .append("div")
      .attr("class", "bar-tooltip")
      .style("opacity", 0);

    svg.selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.name))
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => height - y(d.value))
      .attr("fill", "#1890ff")
      .on("mouseover", function (event, d) {
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.name}</strong>: ${d.value}`)
          .style("left", event.offsetX + "px")
          .style("top", event.offsetY - 30 + "px");
        d3.select(this).attr("fill", "#40a9ff");
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
        d3.select(this).attr("fill", "#1890ff");
      });
  }, [chartData, xLabel, yLabel]);

  return (
    <div className="chart-card">
      <div className="chart-title">{title}</div>
      <div ref={chartRef} className="bar-chart-container" />
    </div>
  );
};

export default BarChart;
