import { useEffect, useState } from "react";
import { getECGSnippet } from "../../helpers/getECGSnippet";
import { getECGTime } from "../../helpers/getECGTime";
import { normalizeECG } from "../../helpers/normaliseECG";

export const ECGTile: React.FC<{
  scale: number;
  height: number;
  padding?: { top: number; right: number; bottom: number; left: number };
}> = ({ padding }) => {
  const [data, setData] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<string>("");

  useEffect(() => {
    getECGSnippet(20, 2).then(raw => setData(normalizeECG(raw)));
    getECGTime().then((time: string) => setStartTime(time));
  }, []);

  if (!data.length) return null;

  const width = 100;
  const height = 100;
  const pad = padding || { top: 20, right: 9, bottom: 5, left: 2 };
  const innerWidth = width - pad.left - pad.right;
  const innerHeight = height - pad.top - pad.bottom;

  const path = data
    .map((y, i) => {
      const x = (i / (data.length - 1)) * innerWidth + pad.left;
      const yPos = (1 - y) * innerHeight + pad.top;
      return `${i === 0 ? "M" : "L"} ${x} ${yPos}`;
    })
    .join(" ");

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d={path}
        fill="none"
        stroke="#00ff9c"
        strokeWidth={5}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
      />

      {startTime && (
        <text
          x={pad.left}
          y={height - pad.bottom / 2}
          fill="#00ff9c"
          fontSize={4}
          filter="url(#glow)"
        >
          {startTime}
        </text>
      )}
    </svg>
  );
};
