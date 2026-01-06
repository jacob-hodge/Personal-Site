import type { RowItem } from "../types/tile";
import { isTile } from "../types/tile";  
import { TileView } from "./TileView";

type Props = {
  row: RowItem[];
  scale: number;
  baseHeight: number;
};

export function TileRow({ row, scale, baseHeight }: Props) {
  return (
    <div className="row">
      {row.map((item, i) =>
        !isTile(item) ? (
          <div
            key={`filler-${i}`}
            className="filler"
            style={{ height: baseHeight * scale }}
          />
        ) : (
          <TileView
            key={item.id}
            tile={item}
            scale={scale}
            height={baseHeight}
          />
        )
      )}
    </div>
  );
}
