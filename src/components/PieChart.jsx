import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../css/PieChart.css";

const PieChart = ({ data, title }) => {
  const chartRef = useRef();

  useEffect(() => {
    d3.select(chartRef.current).select("svg").remove();

    const width = 400;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 30;

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
      .range(["#1890ff", "#ff4d4f", "#52c41a"]);

    const pie = d3.pie().value((d) => d.value);
    const data_ready = pie(data);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const outerArc = d3.arc()
      .innerRadius(radius * 1.05)
      .outerRadius(radius * 1.05);

    const tooltip = d3
      .select(chartRef.current)
      .append("div")
      .attr("class", "pie-tooltip")
      .style("opacity", 0);

    const currencyFormatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

    // Draw pie slices
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
            `<strong>${d.data.label}</strong>: ${currencyFormatter.format(d.data.value)}`
          )
          .style("opacity", 1)
          .style("left", event.offsetX + 10 + "px")
          .style("top", event.offsetY - 10 + "px");
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", event.offsetX + 10 + "px")
          .style("top", event.offsetY - 10 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    // Helper: Compute label positions to avoid overlap
    // Split labels into left and right
    const labelsRight = [];
    const labelsLeft = [];

    data_ready.forEach(d => {
      const midAngle = (d.startAngle + d.endAngle) / 2;
      if (midAngle < Math.PI) {
        labelsRight.push(d);
      } else {
        labelsLeft.push(d);
      }
    });

    // Function to adjust label Y positions to avoid overlap (simple vertical spacing)
    function adjustPositions(labels) {
      labels.sort((a, b) => {
        const aPos = outerArc.centroid(a)[1];
        const bPos = outerArc.centroid(b)[1];
        return aPos - bPos;
      });

      let spacing = 14; // px spacing between labels
      for (let i = 1; i < labels.length; i++) {
        const prevPos = labels[i-1].yPos || outerArc.centroid(labels[i-1])[1];
        let currentPos = outerArc.centroid(labels[i])[1];
        if (currentPos - prevPos < spacing) {
          currentPos = prevPos + spacing;
        }
        labels[i].yPos = currentPos;
      }
      // For the first element, set yPos as centroid y
      if (labels.length > 0) {
        labels[0].yPos = outerArc.centroid(labels[0])[1];
      }
    }

    adjustPositions(labelsRight);
    adjustPositions(labelsLeft);

    // Combine back for drawing lines and texts
    const allLabels = [...labelsRight, ...labelsLeft];

    // Draw polylines from slice to labels
    svg
      .selectAll("polyline")
      .data(allLabels)
      .enter()
      .append("polyline")
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .attr("fill", "none")
      .attr("points", (d) => {
        const posA = arc.centroid(d); // Slice center
        const posB = outerArc.centroid(d); // Just outside slice
        const midAngle = (d.startAngle + d.endAngle) / 2;
        const posC = [radius * 1.15 * (midAngle < Math.PI ? 1 : -1), d.yPos]; // Fixed X on left or right, adjusted Y
        return [posA, posB, posC];
      });

    // Draw labels
    svg
      .selectAll("text")
      .data(allLabels)
      .enter()
      .append("text")
      .text(
        (d) =>
          `${d.data.label}: ${currencyFormatter.format(d.data.value)}`
      )
      .attr("transform", (d) => {
        const midAngle = (d.startAngle + d.endAngle) / 2;
        const x = radius * 1.15 * (midAngle < Math.PI ? 1 : -1);
        const y = d.yPos;
        return `translate(${x},${y})`;
      })
      .style("text-anchor", (d) =>
        (d.startAngle + d.endAngle) / 2 < Math.PI ? "start" : "end"
      )
      .style("font-size", "11px")
      .style("fill", "#333");
  }, [data]);

  return (
    <div className="chart-card">
      <div className="chart-title">Financial Summary {title}</div>
      <div ref={chartRef} className="pie-chart-container" />
    </div>
  );
};

export default PieChart;
