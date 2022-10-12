// @flow
import * as React from 'react';
import {
  FloatingRouteMarker,
  FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS,
} from 'baseui/map-marker';
import ReactMapGL, {Marker, Source, Layer} from 'react-map-gl';
import {useStyletron} from 'baseui';

const uberHq = {
  latitude: 37.768495131168336,
  longitude: -122.38856031220648,
};

function calculateMidpoint([[x1, y1], [x2, y2]]) {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          [-66.12117290496826, 18.46832392198594],
          [-66.1238443851471, 18.470623748008414],
        ],
      },
    },
  ],
};

export default function Example() {
  const [css, theme] = useStyletron();

  const midpoint = calculateMidpoint(
    geojson.features[0].geometry.coordinates,
  );
  console.log(midpoint);
  const [viewport, setViewport] = React.useState({
    longitude: midpoint[0],
    latitude: midpoint[1],
    zoom: 14,
  });
  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="500px"
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxApiAccessToken="pk.eyJ1IjoiYmFiYnN1YmVyIiwiYSI6ImNrdThqeGkxZTVwb3kyd3BpZGRlc2NlOXUifQ.qh-EtXm2DJQZVprWUJ-GFQ"
    >
      <Source id={`route-line`} type="geojson" data={geojson}>
        <Layer
          id={`background-route-line`}
          type="line"
          layout={{
            'line-join': 'round',
            'line-cap': 'round',
          }}
          paint={{
            'line-color': theme.colors.contentPrimary,
            'line-width': 4,
          }}
        />
      </Source>
      <Marker longitude={midpoint[0]} latitude={midpoint[1]}>
        <FloatingRouteMarker
          label="Fastest route"
          anchorPosition={
            FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomLeft
          }
          overrides={{
            Root: {
              style: () => ({
                // transform: `translate(-50%, -50%)`,
              }),
            },
          }}
        />
      </Marker>
    </ReactMapGL>
  );
}
