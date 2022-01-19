/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {FloatingMarker} from '../index.js';
import {
  FLOATING_MARKER_ANCHOR_POSITIONS,
  FLOATING_MARKER_ANCHOR_TYPES,
} from '../constants.js';
import TileGrid from './tile-grid.js';
import {Checkbox, LABEL_PLACEMENT} from '../../checkbox/index.js';
import {Input} from '../../input/index.js';
import Upload from '../../icon/upload.js';
import Search from '../../icon/search.js';
import {Select} from '../../select/index.js';
import ReactMapGL, {Marker, Layer, Source} from 'react-map-gl';
import {Button} from '../../button/index.js';

const floatingMarkerAnchorTypes = Object.keys(FLOATING_MARKER_ANCHOR_TYPES)
  .map(key => FLOATING_MARKER_ANCHOR_TYPES[key])
  .map(x => ({
    label: x,
    id: x,
  }));

const floatingMarkerAnchorPositions = Object.keys(
  FLOATING_MARKER_ANCHOR_POSITIONS,
)
  .map(key => FLOATING_MARKER_ANCHOR_POSITIONS[key])
  .map(x => ({
    label: x,
    id: x,
  }));

const uberHq = {
  latitude: 37.768495131168336,
  longitude: -122.38856031220648,
};

export function Scenario() {
  const [label, setLabel] = React.useState('Uber HQ');
  const [startEnhancer, setStartEnhancer] = React.useState(true);
  const [endEnhancer, setEndEnhancer] = React.useState(false);
  const [
    floatingMarkerAnchorType,
    setFloatingMarkerAnchorType,
  ] = React.useState([floatingMarkerAnchorTypes[0]]);

  const [
    floatingMarkerAnchorPosition,
    setFloatingMarkerAnchorPosition,
  ] = React.useState([floatingMarkerAnchorPositions[0]]);

  const [locations, setLocations] = React.useState([
    [uberHq.longitude, uberHq.latitude],
  ]);

  const [showPointDebug, setShowPointDebug] = React.useState(true);

  const [viewport, setViewport] = React.useState({
    ...uberHq,
    zoom: 14,
  });

  console.log(floatingMarkerAnchorPosition);
  return (
    <>
      <TileGrid
        cols={7}
        customizerOptions={[
          <Input
            value={label}
            onChange={e => setLabel(e.target.value)}
            placeholder="Label"
            clearOnEscape
            key="label"
          />,

          <Checkbox
            checked={startEnhancer}
            onChange={e => setStartEnhancer(e.target.checked)}
            labelPlacement={LABEL_PLACEMENT.right}
            key="start-endhancer"
          >
            Start enhancer
          </Checkbox>,
          <Checkbox
            checked={endEnhancer}
            onChange={e => setEndEnhancer(e.target.checked)}
            labelPlacement={LABEL_PLACEMENT.right}
            key="end-enhancer"
          >
            End enhancer
          </Checkbox>,
          <Select
            options={floatingMarkerAnchorTypes}
            value={floatingMarkerAnchorType}
            placeholder="Select an anchor type"
            onChange={params => setFloatingMarkerAnchorType(params.value)}
            key="anchor-type"
          />,
          <Select
            options={floatingMarkerAnchorPositions}
            value={floatingMarkerAnchorPosition}
            placeholder="Select an anchor position"
            onChange={params => setFloatingMarkerAnchorPosition(params.value)}
            key="anchor-position"
          />,
          <Button onClick={() => setLocations([])} key="clear-markers">
            Clear markers
          </Button>,
          <Checkbox
            checked={showPointDebug}
            onChange={e => setShowPointDebug(e.target.checked)}
            labelPlacement={LABEL_PLACEMENT.right}
            key="point-debug"
          >
            Show point debug
          </Checkbox>,
        ]}
      />
      <ReactMapGL
        {...viewport}
        width="100%"
        height="760px"
        onViewportChange={viewport => setViewport(viewport)}
        mapboxApiAccessToken="pk.eyJ1IjoiYmFiYnN1YmVyIiwiYSI6ImNrdThqeGkxZTVwb3kyd3BpZGRlc2NlOXUifQ.qh-EtXm2DJQZVprWUJ-GFQ"
        onClick={({lngLat}) => setLocations(existing => [...existing, lngLat])}
      >
        {locations.map((x, i) => (
          <Marker latitude={x[1]} longitude={x[0]} key={i}>
            <FloatingMarker
              overrides={{
                Root: {
                  style: () => ({
                    transform: `translate(-50%, -50%)`,
                  }),
                },
              }}
              anchorType={floatingMarkerAnchorType[0].id}
              label={label}
              startEnhancer={
                startEnhancer
                  ? function renderEnhancer({size}) {
                      return <Upload size={size} />;
                    }
                  : undefined
              }
              endEnhancer={
                endEnhancer
                  ? function renderEnhancer({size}) {
                      return <Search size={size} />;
                    }
                  : undefined
              }
              anchor={floatingMarkerAnchorPosition[0].id}
            />
          </Marker>
        ))}
        {showPointDebug && (
          <Source
            id="my-data"
            type="geojson"
            data={{
              type: 'FeatureCollection',
              features: locations.map(x => ({
                type: 'Feature',
                geometry: {type: 'Point', coordinates: x},
              })),
            }}
          >
            <Layer
              {...{
                id: 'point',
                type: 'circle',
                paint: {
                  'circle-radius': 12,
                  'circle-color': 'red',
                },
              }}
            />
          </Source>
        )}
      </ReactMapGL>
    </>
  );
}
