// @flow
import * as React from 'react';
import {
  FloatingMarker,
  FLOATING_MARKER_SIZES,
  ANCHOR_POSITIONS,
} from 'baseui/map-marker';

export default function Example() {
  return (
    <FloatingMarker
      label="Uber HQ"
      anchor={ANCHOR_POSITIONS.none}
      size={FLOATING_MARKER_SIZES.small}
    />
  );
}
