// @flow
import * as React from 'react';
import {FixedMarker} from 'baseui/map-marker';
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
  const [position, setPosition] = React.useState(uberHq);
  const [dragging, setDragging] = React.useState(false);

  const onMarkerDragStart = React.useCallback(() => {
    setDragging(true);
  }, []);

  const onMarkerDragEnd = React.useCallback(event => {
    setPosition({
      latitude: event.lngLat[1],
      longitude: event.lngLat[0],
    });
    setDragging(false);
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="500px"
      onViewportChange={(viewport: Viewport) =>
        setViewport(viewport)
      }
      mapboxApiAccessToken="pk.eyJ1IjoiYmFiYnN1YmVyIiwiYSI6ImNrdThqeGkxZTVwb3kyd3BpZGRlc2NlOXUifQ.qh-EtXm2DJQZVprWUJ-GFQ"
    >
      <Marker
        {...position}
        draggable
        onDragStart={onMarkerDragStart}
        onDragEnd={onMarkerDragEnd}
      >
        <FixedMarker
          label="Drag me!"
          dragging={dragging}
          overrides={{
            Root: {
              style: () => ({
                transform: `translate(-50%, -100%)`,
              }),
            },
          }}
        />
      </Marker>
    </ReactMapGL>
  );
}
