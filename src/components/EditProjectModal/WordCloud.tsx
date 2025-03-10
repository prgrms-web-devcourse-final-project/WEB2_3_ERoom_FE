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

      const maxWordValue = Math.max(...words.map((word) => word.value));

      const weightFactor = (size: number): number => {
        if (!canvasRef.current) return 0;
        const baseSize = 16;
        return baseSize + (size / maxWordValue) * 40;
      };
      const totalValue = words.reduce((sum, word) => sum + word.value, 0);

      // ✅ weight를 명시적으로 number로 변환하여 에러 해결
      const getColor = (
        word: string,
        weight: string | number,
        fontSize: number,
        distance: number,
        theta: number
      ) => {
        const numericWeight = Number(weight);
        const intensity = numericWeight / totalValue;
        console.log(word, fontSize, distance, theta);
        return `rgb(43,62,52, ${intensity})`;
      };

      WordCloudForm(canvasRef.current, {
        list: wordArray,
        gridSize: gridSize,
        weightFactor: weightFactor,
        fontFamily: "Impact, 'Pretendard'",
        color: getColor,
        backgroundColor: "#ffffff",
        rotateRatio: 0.5,
      });
    }
  }, [words]);

  return (
    <div>
      <canvas ref={canvasRef} width={300} height={250}></canvas>
    </div>
  );
};

export default WordCloud;
