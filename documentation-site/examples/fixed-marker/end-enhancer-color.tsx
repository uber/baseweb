import * as React from 'react';
import {FixedMarker} from 'baseui/map-marker';
import {DeleteAlt} from 'baseui/icon';

export default function Example() {
  return (
    <FixedMarker
      label="Illegal Dropoff"
      endEnhancer={({size}: {size: number}) => (
        <DeleteAlt size={size} />
      )}
      color="white"
      background="#E11900"
    />
  );
}
