import { useEffect, useRef } from "react";
import * as d3 from "d3";

export const useAudioVisualizer = (
  audioData: number[],
  currentTime: number,
  duration: number,
  onSeek: (time: number) => void
) => {
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!waveformRef.current || audioData.length === 0 || duration === 0)
      return;

    const width = waveformRef.current.clientWidth;
    const height = waveformRef.current.clientHeight;
    const margin = { top: 40, bottom: 30, left: 30, right: 30 };
    const padding = 0.9;
    const domain = d3.extent(audioData) as [number, number];

    const xScale = d3
      .scaleLinear()
      .domain([0, audioData.length - 1])
      .range([margin.left, width - margin.right]);
    const yScale = d3
      .scaleLinear()
      .domain(domain)
      .range([margin.top, height - margin.bottom]);

    const svg = d3
      .create("svg")
      .style("width", "100%")
      .style("height", "100%")
      .style("display", "block");
    const g = svg.append("g").attr("transform", `translate(0, ${height / 2})`);

    const band = (width - margin.left - margin.right) / audioData.length;

    g.selectAll("rect")
      .data(audioData)
      .join("rect")
      .attr("fill", "#03A300")
      .attr("height", (d) => yScale(d))
      .attr("width", () => band * padding)
      .attr("x", (_, i) => xScale(i))
      .attr("y", (d) => -yScale(d) / 2)
      .attr("rx", band / 2)
      .attr("ry", band / 2);

    const cursor = svg.append("g").attr("class", "cursor");

    cursor
      .append("line")
      .attr("stroke", "blue")
      .attr("stroke-width", 4)
      .attr("y1", 15)
      .attr("y2", height / 2);
    cursor
      .append("polygon")
      .attr("points", "0,0 10,25 -10,25")
      .attr("fill", "blue")
      .attr("transform", `translate(0, 10)`);

    const updateCursor = (time: number) => {
      if (isNaN(time)) return;
      const x = xScale((time / duration) * audioData.length);
      if (!isNaN(x)) cursor.attr("transform", `translate(${x}, 0)`);
    };

    updateCursor(currentTime);

    const drag = d3
      .drag()
      .on("drag", (event) => {
        const x = event.x;
        const time = (xScale.invert(x) / audioData.length) * duration;
        updateCursor(time);
      })
      .on("end", (event) => {
        const x = event.x;
        const time = (xScale.invert(x) / audioData.length) * duration;
        onSeek(time);
      });

    (cursor as unknown as d3.Selection<Element, unknown, null, undefined>).call(
      drag
    );

    waveformRef.current.innerHTML = "";
    waveformRef.current.appendChild(svg.node() as Node);
  }, [audioData, currentTime, duration, onSeek]);

  return waveformRef;
};
