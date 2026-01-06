import { useEffect, useRef, useState } from "react";
import "./App.css";

import { TileRow } from "./components/TileRow";
import { computeRows } from "./layout/computeRows";
import type { Tile, RowItem } from "./types/tile";

const BASE_TILE_HEIGHT = 240;

const tiles: Tile[] = [
  { id: "ecg", className: "red", label: "A", width: 600 },
  { id: "b", className: "blue", label: "B", width: 450 },
  { id: "c", className: "green", label: "C", width: 260 },
  { id: "d", className: "orange", label: "D", width: 260 },
  { id: "e", className: "purple", label: "E", width: 450 }
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [rows, setRows] = useState<RowItem[][]>([]);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function recompute() {
      if (!containerRef.current) return;

      const { rows, scale } = computeRows(
        tiles,
        containerRef.current.clientWidth
      );

      setRows(rows);
      setScale(scale);
    }

    recompute();
    window.addEventListener("resize", recompute);

    return () => window.removeEventListener("resize", recompute);
  }, []);

  return (
    <div className="app">
      <div className="tiles" ref={containerRef}>
        {rows.map((row, i) => (
          <TileRow
            key={i}
            row={row}
            scale={scale}
            baseHeight={BASE_TILE_HEIGHT}
          />
        ))}
      </div>

      <div
        className="bottom"
        style={{ height: BASE_TILE_HEIGHT * scale * 1.8 }}
      >
        BOTTOM IMAGE AREA
      </div>
    </div>
  );
}
