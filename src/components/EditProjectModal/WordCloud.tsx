import React, { useRef, useEffect } from "react";
import WordCloudForm from "wordcloud";

const WordCloud: React.FC<WordCloudProps> = ({ words }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const wordArray: [string, number][] = words.map((word) => [
        word.text,
        word.value,
      ]);

      const gridSize = Math.round(
        (16 * Math.max(...words.map((word) => word.value))) / 1024
      );

      const weightFactor = (size: number): number => {
        if (!canvasRef.current) return 0; // canvas가 없을 경우 0을 반환
        return (Math.pow(size, 2.8) * canvasRef.current.width) / 1024;
      };

      WordCloudForm(canvasRef.current, {
        list: wordArray,
        gridSize: gridSize,
        weightFactor: weightFactor, // 크기 조정
        fontFamily: "Impact",
        color: "random-dark", // 글자 색상
        backgroundColor: "#ffffff", // 배경 색상
        rotateRatio: 0.5, // 회전 비율
      });
    }
  }, [words]);

  return <canvas ref={canvasRef} width={300} height={250}></canvas>;
};

export default WordCloud;
