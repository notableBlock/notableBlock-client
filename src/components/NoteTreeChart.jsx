import { useRef, useEffect } from "react";
import { useNavigate } from "react-router";

import * as d3 from "d3";

function NoteTreeChart({ noteData }) {
  const svgRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 700;
    const dx = 20;
    const dy = 200;
    const tree = d3.tree().nodeSize([dx, dy]);
    const root = d3.hierarchy(noteData);
    tree(root);

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [-dy / 2, -dx, width, dx * root.height + dx])
      .style("font", "10px sans-serif");

    const g = svg.append("g");

    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 2])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    g.append("g")
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("fill", "none")
      .attr("stroke", "#555555")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x)
      );

    const node = g
      .append("g")
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${d.y},${d.x})`)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        if (d.depth === 0) return;
        navigate(`/notes/${d.data._id}`);
      });

    node
      .append("circle")
      .attr("r", 5)
      .attr("fill", (d) => (d.depth === 0 ? "#555555" : d.data.shared ? "#05B606" : "#DD1C1B"));

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "white")
      .style("border", "1px solid #ddd")
      .style("padding", "5px")
      .style("border-radius", "4px")
      .style("box-shadow", "2px 2px 10px rgba(0,0,0,0.1)")
      .style("display", "none")
      .style("pointer-events", "none");

    node
      .on("mouseover", (event, d) => {
        tooltip
          .style("display", "block")
          .html(
            d.depth === 0
              ? `<strong>${d.data.name}</strong>`
              : `📖 <strong>${d.data.name}</strong><br>👤 원본 소유자: ${d.data.creator}<br>✏️ 수정자: ${d.data.editor}`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      })
      .on("mousemove", (event) => {
        tooltip.style("left", `${event.pageX + 10}px`).style("top", `${event.pageY + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("display", "none");
      });

    node
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", (d) => (d.children ? -10 : 10))
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .style("paint-order", "stroke")
      .style("stroke", "#FFFFFF")
      .style("stroke-width", 3)
      .text((d) => d.data.name);
  }, [noteData, navigate]);

  return <svg ref={svgRef}></svg>;
}

export default NoteTreeChart;
