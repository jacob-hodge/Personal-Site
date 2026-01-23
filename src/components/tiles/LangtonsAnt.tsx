import React, { useEffect, useRef, useState } from "react";
import "../styles/LangtonsAnt.css";

const COLORS = ["#FF0000", "#00FF00", "#0000FF", "#FFA500", "#800080", "#00FFFF", "#FFC0CB", "#FFFF00"];
const MAX_STEPS = 10000;
type Rule = "L" | "R" | "U" | "C";

type Padding = { top: number; right: number; bottom: number; left: number };

export const LangtonsAntTile: React.FC<{ padding?: Padding }> = ({ padding }) => {
  const pad: Padding = padding || { top: 25, right: 25, bottom: 20, left: 10 };
  const leftRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [ruleString, setRuleString] = useState<string>("LR");
  const [running, setRunning] = useState(false);
  const [stepCount, setStepCount] = useState(0);

  const gridSize = 50; 
  const [grid, setGrid] = useState<number[][]>(Array(gridSize).fill(0).map(() => Array(gridSize).fill(0)));
  const [antPos, setAntPos] = useState({ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) });
  const [antDir, setAntDir] = useState<number>(0);

  const turn = (dir: number, rule: Rule) => {
    switch (rule) {
      case "L": return (dir + 3) % 4;
      case "R": return (dir + 1) % 4;
      case "U": return (dir + 2) % 4;
      case "C": return dir;
      default: return dir;
    }
  };

  const moveAnt = (x: number, y: number, dir: number) => {
    switch (dir) {
      case 0: return { x, y: y - 1 };
      case 1: return { x: x + 1, y };
      case 2: return { x, y: y + 1 };
      case 3: return { x: x - 1, y };
      default: return { x, y };
    }
  };

  const drawGrid = () => {
    const canvas = canvasRef.current;
    const container = leftRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    const cellW = width / gridSize;
    const cellH = height / gridSize;

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const colorIdx = grid[y][x];
        if (colorIdx > 0 && colorIdx < COLORS.length) {
          ctx.fillStyle = COLORS[colorIdx];
          ctx.fillRect(x * cellW, y * cellH, cellW, cellH);
        }
      }
    }

    ctx.fillStyle = "#00ff9c";
    ctx.fillRect(antPos.x * cellW, antPos.y * cellH, cellW, cellH);
  };

  const step = () => {
    if (stepCount >= MAX_STEPS) {
      setRunning(false);
      return;
    }

    const ruleArray = ruleString.split("") as Rule[];
    const cellValue = grid[antPos.y][antPos.x];
    const rule = ruleArray[cellValue % ruleArray.length];

    const newDir = turn(antDir, rule);
    const newGrid = grid.map(row => row.slice());
    newGrid[antPos.y][antPos.x] = (cellValue + 1) % ruleArray.length;

    const newPos = moveAnt(antPos.x, antPos.y, newDir);

    newPos.x = (newPos.x + gridSize) % gridSize;
    newPos.y = (newPos.y + gridSize) % gridSize;

    setGrid(newGrid);
    setAntDir(newDir);
    setAntPos(newPos);
    setStepCount(prev => prev + 1);
  };

  useEffect(() => {
    let anim: number;
    if (running) {
      const loop = () => {
        step();
        drawGrid();
        anim = requestAnimationFrame(loop);
      };
      anim = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(anim);
  }, [running, grid, antPos, antDir, stepCount, ruleString]);

  useEffect(() => {
    drawGrid();
  }, [grid, antPos]);

  const handleReset = () => {
    setGrid(Array(gridSize).fill(0).map(() => Array(gridSize).fill(0)));
    setAntPos({ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) });
    setAntDir(0);
    setStepCount(0);
    drawGrid();
  };

  return (
    <div
      className="split-tile"
      style={{
        paddingTop: pad.top,
        paddingRight: pad.right,
        paddingBottom: pad.bottom,
        paddingLeft: pad.left,
        display: "flex",
        gap: "10px",
      }}
    >
      <div
        ref={leftRef}
        className="split-left"
        style={{
          flex: 4,
          backgroundColor: "transparent",
          border: "1px solid #00ff9c",
          position: "relative",
        }}
      >
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      </div>

      <div
        className="split-right"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          border: "1px solid #00ff9c",
          padding: "10px",
          backgroundColor: "transparent",
        }}
      >
        <input
          type="text"
          value={ruleString}
          maxLength={8}
          onChange={(e) => setRuleString(e.target.value.toUpperCase().replace(/[^LRUC]/g, ""))}
          placeholder="Rules: L,R,U,C"
          style={{
            width: "80%",
            padding: "6px",
            fontFamily: "var(--retro-font)",
            fontSize: "13px",
            fontWeight: "bold",
            border: "1px solid #00ff9c",
            backgroundColor: "transparent",
            color: "#00ff9c",
          }}
        />
        <button className="split-button" onClick={() => setRunning(true)}>Start</button>
        <button className="split-button" onClick={() => setRunning(false)}>Stop</button>
        <button className="split-button" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};
