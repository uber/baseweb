// @flow
import * as React from 'react';
import {
  FixedMarker,
  NEEDLE_SIZES,
  PINHEAD_SIZES,
} from 'baseui/map-marker';

export default function Example() {
  return (
    <FixedMarker
      size={PINHEAD_SIZES.xSmallCircle}
      needle={NEEDLE_SIZES.tall}
    />
  );
}
