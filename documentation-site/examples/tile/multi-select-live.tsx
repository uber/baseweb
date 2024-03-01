import * as React from "react";
import { Tile, TileGroup, TILE_GROUP_KIND, TILE_KIND } from "baseui/tile";

export default function Example() {
  const [selected, setSelected] = React.useState<Array<number>>([]);

  return (
    <TileGroup
      kind={TILE_GROUP_KIND.multiSelectLive}
      selected={selected}
      onClick={(_event, index) => {
        if (!selected.includes(index)) {
          setSelected([...selected, index]);
        } else {
          setSelected(selected.filter((value) => value !== index));
        }
      }}
    >
      <Tile tileKind={TILE_KIND.selection} label="Option 1" />
      <Tile tileKind={TILE_KIND.selection} label="Option 2" />
      <Tile tileKind={TILE_KIND.selection} label="Option 3" />
    </TileGroup>
  );
}
