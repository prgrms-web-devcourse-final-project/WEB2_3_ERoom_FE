import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import { scaleSequential } from "d3-scale";

interface Word {
  text: string;
  size: number;
  x?: number;
  y?: number;
  rotate?: number;
}

interface WordCloudProps {
  words: { text: string; value: number }[];
}

const WordCloud: React.FC<WordCloudProps> = ({ words }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 300;
  const height = 250;

  console.log(words);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // 기존 SVG 내용 제거

    const layout = cloud<Word>()
      .size([width - 50, height - 50])
      .words(
        words.map((word) => ({
          text: word.text,
          size: word.value,
        }))
      )
      .padding((d) => Math.log(d.size) * 2)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90)) // 가독성 고려
      .font("Impact")
      .fontSize((d) => Math.min(30, Math.max(10, d.size)))
      .spiral("archimedean")
      .random(Math.random) // random 문제 해결
      .on("end", draw);

    layout.start();

    function draw(words: Word[]) {
      const g = svg
        .append("g")
        .attr(
          "transform",
          `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`
        );

      g.selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("font-family", "Impact")
        .style("fill", (d) => {
          const colorScale = scaleSequential(d3.interpolateGreens).domain([
            d3.min(words, (d) => d.size) || 10,
            d3.max(words, (d) => d.size) || 140,
          ]);
          return colorScale(d.size); // 글자 크기에 따라 색상이 변하도록 설정
        })
        .attr("text-center", "middle")
        .attr(
          "transform",
          (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`
        )
        .text((d) => d.text);
    }
  }, [words]);

  return (
    <svg
      className="border-[1px] border-gray01"
      ref={svgRef}
      width="300"
      height="250"
    ></svg>
  );
};

export default WordCloud;
