import type { Tile } from "../types/tile";

type Props = {
  tile: Tile;
  scale: number;
  height: number;
};

function getTileImage(tile: Tile) {
  const base = `/assets/tile${tile.width}`;

  if (tile.isTopRow && tile.isRightMost) return `${base}_top_right.png`;
  if (tile.isTopRow) return `${base}_top.png`;
  if (tile.isRightMost) return `${base}_right.png`;

  return `${base}.png`;
}

export function TileView({ tile, scale, height }: Props) {
  return (
    <div
      className={`tile ${tile.className}`}
      style={{
        width: tile.width * scale,
        height: height * scale
      }}
    >
      <img
        src={getTileImage(tile)}
        alt={tile.label}
        className="tile-image"
      />
    </div>
  );
}
