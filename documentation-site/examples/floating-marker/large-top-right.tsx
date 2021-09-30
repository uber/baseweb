import * as React from 'react';
import {
  FloatingMarker,
  FLOATING_MARKER_ANCHOR_POSITIONS,
  FLOATING_MARKER_SIZES,
} from 'baseui/map-marker';

export default function Example() {
  return (
    <FloatingMarker
      label="Uber HQ"
      anchor={FLOATING_MARKER_ANCHOR_POSITIONS.topRight}
      size={FLOATING_MARKER_SIZES.large}
    />
  );
}
