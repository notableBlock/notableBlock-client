import { useRef, useEffect } from "react";
import { useNavigate } from "react-router";

import noteIcon from "assets/images/note-icon.png";
import creatorIcon from "assets/images/creator-icon.png";
import editorIcon from "assets/images/editor-icon.png";

import * as d3 from "d3";

import type { HierarchyPointLink, HierarchyPointNode } from "d3";
import type { NoteTreeChartProps } from "types/components";
import type { Tree } from "types/note";

function NoteTreeChart({ noteData }: NoteTreeChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 800;
    const dx = 20;
    const dy = 200;
    const tree = d3.tree<Tree>().nodeSize([dx, dy]);
    const root = d3.hierarchy(noteData);
    tree(root);

    root.each((node) => {
      node.data.rootUserId = root.data.id;
    });

    if (!svgRef.current) return;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [-dy / 2, -dx, width, dx * root.height + dx])
      .style("font", "10px sans-serif");

    const g = svg.append("g");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 2])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    const linkPath = d3
      .linkHorizontal<HierarchyPointLink<Tree>, HierarchyPointNode<Tree>>()
      .x((d) => d.y)
      .y((d) => d.x);

    g.append("g")
      .selectAll("path")
      .data(root.links() as HierarchyPointLink<Tree>[])
      .join("path")
      .attr("fill", "none")
      .attr("stroke", "#555555")
      .attr("stroke-width", 1.5)
      .attr("d", linkPath);

    const node = g
      .append("g")
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${d.y},${d.x})`)
      .style("cursor", "pointer")
      .on("click", (_, d) => {
        if (d.depth === 0) return;

        tooltip.style("display", "none");

        switch (true) {
          case d.data.rootUserId === d.data.editorId:
            return navigate(`/notes/${d.data._id}`);
          case d.data.isShared:
            return navigate(`/shared/${d.data._id}`);
          default:
            return;
        }
      });

    node
      .append("circle")
      .attr("r", 5)
      .attr("fill", (d) => (d.depth === 0 ? "#555555" : d.data.isShared ? "#40BF56" : "#F95252"));

    const tooltip = d3
      .select("body")
      .append("div")
      .attr(
        "style",
        "position: absolute; padding: 1rem; background: #FFFFFF; border-radius: 0.5rem; box-shadow: 0 0.25rem 0.75rem #0000003F; text-align: left;"
      );

    node
      .on("mouseover", (event, d) => {
        const isCreator = d.data.rootUserId === d.data.creatorId;
        const isEditor = d.data.rootUserId === d.data.editorId;

        tooltip
          .style("display", "block")
          .html(
            d.depth === 0
              ? `${d.data.name}`
              : `<img src=${noteIcon} alt="노트 아이콘" class="icon" />
                  ${d.data.name} <br>
                  <img src=${creatorIcon} alt="생성자 아이콘" class="icon"/>
                  생성한 사람: <span class="creator">${d.data.creator}</span> <br>
                  <img src=${editorIcon} alt="수정자 아이콘" class="icon"/>
                  수정한 사람: <span class="editor">${d.data.editor}</span>`
          )
          .style("left", `${event.pageX}px`)
          .style("top", `${event.pageY}px`);

        tooltip
          .selectAll(".creator")
          .style("color", isCreator ? "#0279FC" : "#000")
          .style("font-weight", isCreator ? "bold" : "normal");

        tooltip
          .selectAll(".editor")
          .style("color", isEditor ? "#0279FC" : "#000")
          .style("font-weight", isEditor ? "bold" : "normal");

        tooltip.selectAll(".icon").style("width", "1.75rem").style("vertical-align", "middle");
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
