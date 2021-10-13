// @flow
import * as React from 'react';
import {
  FloatingMarker,
  FLOATING_MARKER_ANCHOR_TYPES,
  FLOATING_MARKER_SIZES,
} from 'baseui/map-marker';
import Search from 'baseui/icon/search';

export default function Example() {
  return (
    <FloatingMarker
      label="Uber HQ"
      anchorType={FLOATING_MARKER_ANCHOR_TYPES.square}
      startEnhancer={<Search size="24px" />}
      size={FLOATING_MARKER_SIZES.large}
    />
  );
}
