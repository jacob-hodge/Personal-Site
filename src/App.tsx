import { useEffect, useRef, useState } from "react";
import "./App.css";
import { TileRow } from "./components/TileRow";
import { computeRows } from "./layout/computeRows";
import type { Tile, RowItem } from "./types/tile";
import { ECGTile } from "./components/tiles/ECGTiles";

const BASE_TILE_HEIGHT = 240;

const tiles: Tile[] = [
  { id: "ecg", className: "red", width: 600, component: ECGTile },
  { id: "b", className: "blue",  width: 450 },
  { id: "c", className: "green", width: 260 },
  { id: "d", className: "orange",  width: 260 },
  { id: "e", className: "purple",  width: 450 }
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
