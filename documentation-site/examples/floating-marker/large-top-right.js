// @flow
import * as React from 'react';
import {
  FloatingMarker,
  ANCHOR_POSITIONS,
  FLOATING_MARKER_SIZES,
} from 'baseui/map-marker';

export default function Example() {
  return (
    <FloatingMarker
      label="Uber HQ"
      anchor={ANCHOR_POSITIONS.topRight}
      size={FLOATING_MARKER_SIZES.large}
    />
  );
}
