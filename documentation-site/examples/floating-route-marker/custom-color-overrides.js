// @flow
import * as React from 'react';
import {FloatingRouteMarker} from 'baseui/map-marker';
import Search from 'baseui/icon/search';

export default function Example() {
  return (
    <>
      <FloatingRouteMarker
        label="14 min"
        secondaryLabel="Avoids tolls"
      />
      <FloatingRouteMarker
        label="14 min"
        secondaryLabel="Avoids tolls"
        selected={true}
      />
    </>
  );
}
