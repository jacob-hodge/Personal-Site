import type { Tile, RowItem } from "../types/tile";
import { getScale } from "./scale";

type ComputeRowsResult = {
  rows: RowItem[][];
  scale: number;
};

export function computeRows(
  tiles: Tile[],
  containerWidth: number
): ComputeRowsResult {
  const scale = getScale(containerWidth);
  const scaledWidths = tiles.map(t => t.width * scale);

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

      const rowWidth = rowTiles.reduce((s, w) => s + w, 0);

      if (rowWidth > containerWidth) {
        rowsCount++;
        done = false;
        break;
      }
    }
  }

  const itemsPerRow = Math.ceil(tiles.length / rowsCount);
  const rows: RowItem[][] = [];

  for (let r = 0; r < rowsCount; r++) {
    const rowTiles = tiles.slice(
      r * itemsPerRow,
      (r + 1) * itemsPerRow
    );

    const layoutTiles = rowTiles.map((tile, i) => ({
      ...tile,
      isTopRow: r === 0,
      isRightMost: i === rowTiles.length - 1
    }));

    rows.push([
      { type: "filler" },
      ...layoutTiles,
      { type: "filler" }
    ]);
  }

  return { rows, scale };
}
