export type Tile = {
  id: string;
  className: string;
  width: number;
  isTopRow?: boolean;
  isRightMost?: boolean;
  component?: React.ComponentType<{ scale: number; height: number }>; 
};
export type RowItem = Tile | { type: "filler" };

export function isTile(item: RowItem): item is Tile {
  return "id" in item;
}