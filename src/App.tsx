import { useEffect, useRef, useState } from "react";
import "./App.css";

type Tile = {
  id: string;
  className: string;
  label: string;
  width: number;
  isTopRow?: boolean;
  isRightMost?: boolean;
};

type RowItem = Tile | { type: "filler" };

const BASE_TILE_HEIGHT = 240;

const tiles: Tile[] = [
  { id: "ecg", className: "red", label: "A", width: 600},
  { id: "b", className: "blue", label: "B", width: 450},
  { id: "c", className: "green", label: "C", width: 260},
  { id: "d", className: "orange", label: "D", width: 260},
  { id: "e", className: "purple", label: "E", width: 450}
];

function isTile(item: RowItem): item is Tile {
  return "id" in item;
}

function getScale(containerWidth: number) {
  if (containerWidth < 600) return 0.65;
  if (containerWidth < 900) return 0.8;
  return 1;
}

function getTileImage(tile: Tile) {
  const base = `/assets/tile${tile.width}`;
  if (tile.isTopRow && tile.isRightMost) return `${base}_top_right.png`;
  if (tile.isTopRow) return `${base}_top.png`;
  if (tile.isRightMost) return `${base}_right.png`;
  return `${base}.png`;
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<RowItem[][]>([]);
  const [scale, setScale] = useState(1);

  const computeRows = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const nextScale = getScale(containerWidth);
    setScale(nextScale);

    const scaledWidths = tiles.map(tile => tile.width * nextScale);
    let rowsCount = 1;
    let done = false;

    while (!done) {
      const itemsPerRow = Math.ceil(tiles.length / rowsCount);
      done = true;

      for (let r = 0; r < rowsCount; r++) {
        const rowTiles = scaledWidths.slice(
          r * itemsPerRow,
          (r + 1) * itemsPerRow
        );
        const rowWidth = rowTiles.reduce((sum, w) => sum + w, 0);

        if (rowWidth > containerWidth) {
          rowsCount++;
          done = false;
          break;
        }
      }
    }

    const finalRows: RowItem[][] = [];
    const itemsPerRow = Math.ceil(tiles.length / rowsCount);

    for (let r = 0; r < rowsCount; r++) {
      const rowTiles = tiles.slice(
        r * itemsPerRow,
        (r + 1) * itemsPerRow
      );

      const layoutTiles: Tile[] = rowTiles.map((tile, index) => ({
        ...tile,
        isTopRow: r === 0,
        isRightMost: index === rowTiles.length - 1
      }));

      finalRows.push([
        { type: "filler" },
        ...layoutTiles,
        { type: "filler" }
      ]);
    }

    setRows(finalRows);
  };

  useEffect(() => {
    computeRows();
    window.addEventListener("resize", computeRows);
    return () => window.removeEventListener("resize", computeRows);
  }, []);

  return (
    <div className="app">
      <div className="tiles" ref={containerRef}>
        {rows.map((row, i) => (
          <div className="row" key={i}>
            {row.map((item, j) =>
              !isTile(item) ? (
                <div
                  key={`filler-${j}`}
                  className="filler"
                  style={{ height: BASE_TILE_HEIGHT * scale }}
                />
              ) : (
                <div
                  key={item.id}
                  className={`tile ${item.className}`}
                  style={{
                    width: item.width * scale,
                    height: BASE_TILE_HEIGHT * scale
                  }}
                >
                  {getTileImage(item) ? (
                    <img
                      src={getTileImage(item)}
                      alt={item.label}
                      className="tile-image"
                    />
                  ) : (
                    item.label
                  )}
                </div>
              )
            )}
          </div>
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
