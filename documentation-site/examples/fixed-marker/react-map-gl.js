// @flow
import * as React from 'react';
import {FixedMarker} from 'baseui/map-marker';
//$FlowFixMe
import ReactMapGL, {Marker} from 'react-map-gl';

const uberHq = {
  latitude: 37.768495131168336,
  longitude: -122.38856031220648,
};

export default function Example() {
  const [viewport, setViewport] = React.useState({
    ...uberHq,
    zoom: 14,
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="500px"
      onViewportChange={viewport => setViewport(viewport)}
      mapboxApiAccessToken="pk.eyJ1IjoiYmFiYnMiLCJhIjoiY2s1b2JoMjZvMGYydzNmbXAxMXp1NWZhZyJ9.LEHmtAFLAij67eF-54FjxA"
    >
      <Marker {...uberHq} offsetLeft={-89 / 2} offsetTop={-48}>
        <FixedMarker label="Uber HQ" />
      </Marker>
    </ReactMapGL>
  );
}
