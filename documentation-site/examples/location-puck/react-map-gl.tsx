import * as React from "react";
import { LocationPuck } from "baseui/map-marker";
import ReactMapGL, { Marker } from "react-map-gl";

const userLocation = {
  latitude: 37.768495131168336,
  longitude: -122.38856031220648,
};
const initialViewport = {
  ...userLocation,
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
      onViewportChange={(viewport: Viewport) => setViewport(viewport)}
      mapboxApiAccessToken="pk.eyJ1IjoiYmFiYnN1YmVyIiwiYSI6ImNrdThqeGkxZTVwb3kyd3BpZGRlc2NlOXUifQ.qh-EtXm2DJQZVprWUJ-GFQ"
    >
      <Marker {...userLocation}>
        <LocationPuck
          confidenceRadius={120}
          overrides={{
            Root: {
              style: () => ({
                transform: `translate(-50%, -50%)`,
              }),
            },
          }}
        />
      </Marker>
    </ReactMapGL>
  );
}
