import * as React from 'react';
import {
  FloatingMarker,
  FLOATING_MARKER_ANCHOR_TYPES,
} from 'baseui/map-marker';

export default function Example() {
  return (
    <FloatingMarker
      label="Uber HQ"
      anchorType={FLOATING_MARKER_ANCHOR_TYPES.square}
    />
  );
}
