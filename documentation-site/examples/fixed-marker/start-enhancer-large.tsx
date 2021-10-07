import * as React from 'react';
import {
  FixedMarker,
  NEEDLE_SIZES,
  PINHEAD_SIZES,
} from 'baseui/map-marker';
import {Search} from 'baseui/icon';

export default function Example() {
  return (
    <FixedMarker
      startEnhancer={<Search />}
      size={PINHEAD_SIZES.large}
      needle={NEEDLE_SIZES.tall}
    />
  );
}
