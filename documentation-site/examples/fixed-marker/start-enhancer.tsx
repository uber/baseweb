import * as React from 'react';
import {FixedMarker} from 'baseui/map-marker';
import {Upload} from 'baseui/icon';

export default function Example() {
  return (
    <FixedMarker label="Cloud Center" startEnhancer={<Upload />} />
  );
}
