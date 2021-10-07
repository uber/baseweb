import * as React from 'react';
import {FixedMarker} from 'baseui/map-marker';
import {DeleteAlt} from 'baseui/icon';

export default function Example() {
  return (
    <FixedMarker
      label="Illegal Dropoff"
      endEnhancer={<DeleteAlt />}
      color="white"
      background="#E11900"
    />
  );
}
