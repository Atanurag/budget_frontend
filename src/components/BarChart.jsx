import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../css/BarChart.css";

const BarChart = ({ chartData, xLabel, yLabel, title }) => {
  const chartRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 50, left: 60 };
    const width = 400 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    d3.select(chartRef.current).select("svg").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("width", "100%")
      .style("height", "100%")
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
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    // X-Axis Label
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .attr("class", "axis-label")
      .text(xLabel);

    // Y-Axis Label (with more spacing from ticks)
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(-90)`)
      .attr("x", -height / 2)
      .attr("y", -margin.left + 30) // adds space between label and ticks
      .attr("class", "axis-label")
      .text(yLabel);

    const tooltip = d3
      .select(chartRef.current)
      .append("div")
      .attr("class", "bar-tooltip")
      .style("opacity", 0);

    const currencyFormatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

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
          .html(`<strong>${d.name}</strong>: ${currencyFormatter.format(d.value)}`)
          .style("left", event.offsetX + "px")
          .style("top", event.offsetY - 30 + "px");
        d3.select(this).attr("fill", "#40a9ff");
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
        d3.select(this).attr("fill", "#1890ff");
      });

    // Add text labels on top of bars with ₹
    svg.selectAll(".bar-label")
      .data(chartData)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", (d) => x(d.name) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.value) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "#333")
      .text((d) => currencyFormatter.format(d.value));
  }, [chartData, xLabel, yLabel]);

  return (
    <div className="chart-card">
      <div className="chart-title">{title}</div>
      <div ref={chartRef} className="bar-chart-container" />
    </div>
  );
};

export default BarChart;
