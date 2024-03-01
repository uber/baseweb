import * as React from "react";
import { Tile, TILE_KIND, ALIGNMENT } from "baseui/tile";
import Upload from "baseui/icon/upload";

export default function Example() {
  return (
    <Tile
      tileKind={TILE_KIND.action}
      leadingContent={() => <Upload size={48} />}
      label="Mixed"
      headerAlignment={ALIGNMENT.center}
      bodyAlignment={ALIGNMENT.right}
    />
  );
}
