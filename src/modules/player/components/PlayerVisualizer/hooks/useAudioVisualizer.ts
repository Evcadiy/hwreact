import { useEffect, useRef } from "react";
import * as d3 from "d3";

export const useAudioVisualizer = (
  audioData: number[],
  currentTime: number,
  duration: number,
  isPlaying: boolean,
  onSeek: (time: number) => void
) => {
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getTimeDomain = () => {
      const steps = 10;
      return [...new Array(steps)].map((_, index) => {
        const seconds = Math.round((index / (steps - 1)) * duration);
        const minutes = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
      });
    };

    if (audioData.length === 0 || !waveformRef.current || duration === 0)
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

    const timeDomain = getTimeDomain();

    const timeScale = d3
      .scaleTime()
      .domain([0, duration])
      .range([margin.left, width - margin.right]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${margin.top - 41})`)
      .selectAll("text")
      .data(timeDomain)
      .join("text")
      .attr("x", (_, i) => timeScale((i / (timeDomain.length - 1)) * duration))

      .attr("y", 10)
      .attr("text-anchor", "middle")
      .text((d) => d)
      .style("font-size", "12px")
      .style("fill", "#555");

    svg
      .append("line")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", margin.top - 30)
      .attr("y2", margin.top - 30)
      .attr("stroke", "#555")
      .attr("stroke-width", 1);

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
      if (duration === 0 || audioData.length === 0 || isNaN(time)) return;
      const x = xScale((time / duration) * audioData.length);
      if (isNaN(x)) return;
      cursor.attr("transform", `translate(${x}, 0)`);
    };

    updateCursor(currentTime);

    const drag = d3
      .drag()
      .on("start", () => {})
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
  }, [audioData, currentTime, duration, onSeek, isPlaying]);

  return waveformRef;
};
