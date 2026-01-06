export type Tile = {
  id: string;
  className: string;
  label: string;
  width: number;
  isTopRow?: boolean;
  isRightMost?: boolean;
};

export type RowItem = Tile | { type: "filler" };

export function isTile(item: RowItem): item is Tile {
  return "id" in item;
}