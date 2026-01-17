import { useEffect, useRef, useState } from "react";
import "./App.css";
import { TileRow } from "./components/TileRow";
import { computeRows } from "./layout/computeRows";
import type { Tile, RowItem } from "./types/tile";
import { ECGTile } from "./components/tiles/ECGTiles";
import { AboutTile } from "./components/tiles/AboutTile";
import { ActivityCalendar } from "./components/tiles/ActivityCalendar";
import { Desk } from "./components/Desk";

const BASE_TILE_HEIGHT = 240;
const BOTTOM_HEIGHT = 440;

const tiles: Tile[] = [
  { id: "about", className: "about", width: 600  ,  component: AboutTile },
  { id: "health", className: "health", width: 450 ,  component: ECGTile },
  { id: "activity", className: "activity", width: 260, component: ActivityCalendar},
  { id: "misc", className: "misc",  width: 260 },
  { id: "tbd", className: "tbd",  width: 450 }
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

      <Desk height={BOTTOM_HEIGHT * scale} />
    </div>
  );
}
