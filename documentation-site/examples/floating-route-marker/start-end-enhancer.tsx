import * as React from 'react';
import {FloatingRouteMarker} from 'baseui/map-marker';
import ChevronRight from 'baseui/icon/chevron-right';
import Search from 'baseui/icon/search';

export default function Example() {
  return (
    <FloatingRouteMarker
      label="Avoids tolls"
      startEnhancer={({size}) => <Search size={size} />}
      endEnhancer={({size}) => <ChevronRight size={size} />}
    />
  );
}
