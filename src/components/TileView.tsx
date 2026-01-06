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
  const Content = tile.component;
  const frameSrc = getTileImage(tile);

  return (
    <div
      className={`tile ${tile.className}`}
      style={{
        width: tile.width * scale,
        height: height * scale,
        position: "relative",
      }}
    >
      {/* Frame image */}
      <img
        src={frameSrc}
        alt=""
        className="tile-frame"
        draggable={false}
      />

      {/* Tile content layer */}
      {Content && (
        <div className="tile-content">
          <Content scale={scale} height={height} />
        </div>
      )}
    </div>
  );
}