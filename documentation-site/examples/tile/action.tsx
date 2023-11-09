import * as React from 'react';
import {Tile, TILE_KIND, ALIGNMENT} from 'baseui/tile';
import Calendar from 'baseui/icon/calendar';

export default function Example() {
  return (
    <Tile
      tileKind={TILE_KIND.action}
      leadingContent={() => <Calendar size={36} color="white" />}
      label="Book now"
      color
      onClick={() => alert('booking appointment')}
      headerAlignment={ALIGNMENT.center}
      bodyAlignment={ALIGNMENT.center}
    />
  );
}
