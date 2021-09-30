import * as React from 'react';
import {FloatingMarker} from 'baseui/map-marker';
// @ts-ignore
import ReactMapGL, {Marker} from 'react-map-gl';

const uberHq = {
  latitude: 37.768495131168336,
  longitude: -122.38856031220648,
};
const initialViewport = {
  ...uberHq,
  zoom: 14,
};

type Viewport = typeof initialViewport;

export default function Example() {
  const [viewport, setViewport] = React.useState(initialViewport);

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="500px"
      onViewportChange={(viewport: Viewport) =>
        setViewport(viewport)
      }
      mapboxApiAccessToken="pk.eyJ1IjoiYmFiYnMiLCJhIjoiY2s1b2JoMjZvMGYydzNmbXAxMXp1NWZhZyJ9.LEHmtAFLAij67eF-54FjxA"
    >
      <Marker {...uberHq} offsetLeft={-8} offsetTop={-8}>
        <FloatingMarker label="Uber HQ" />
      </Marker>
    </ReactMapGL>
  );
}
