import * as React from "react";
import { Tile, TileGroup, TILE_GROUP_KIND, TILE_KIND } from "baseui/tile";

export default function Example() {
  const [selected, setSelected] = React.useState<number>(-1);

  return (
    <TileGroup
      kind={TILE_GROUP_KIND.singleSelect}
      selected={selected}
      onClick={(_event, index) => setSelected(index)}
    >
      <Tile tileKind={TILE_KIND.selection} label="Option 1" />
      <Tile tileKind={TILE_KIND.selection} label="Option 2" />
      <Tile tileKind={TILE_KIND.selection} label="Option 3" />
    </TileGroup>
  );
}
