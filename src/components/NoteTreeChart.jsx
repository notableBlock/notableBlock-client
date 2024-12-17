import { useRef, useEffect } from "react";

import * as d3 from "d3";

function NoteTreeChart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 800;
    const dx = 20;
    const dy = 200;

    const tree = d3.tree().nodeSize([dx, dy]);
    const root = d3.hierarchy(data);

    tree(root);

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [-dy / 2, -dx, width, dx * root.height + dx])
      .style("font", "10px sans-serif");

    const g = svg.append("g");

    g.append("g")
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("fill", "none")
      .attr("stroke", "#555")
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
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node.append("circle").attr("r", 5).attr("fill", "#555");

    node
      .append("text")
      .attr("dy", "0.31em")
      .attr("x", (d) => (d.children ? -10 : 10))
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name);
  }, [data]);

  return <svg ref={svgRef} width="100%"></svg>;
}

export default NoteTreeChart;
