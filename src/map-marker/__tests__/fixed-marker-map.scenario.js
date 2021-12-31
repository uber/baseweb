/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {FixedMarker} from '../index.js';
import {Checkbox, LABEL_PLACEMENT} from '../../checkbox/index.js';
import {
  PINHEAD_SIZES_SHAPES,
  NEEDLE_SIZES,
  BADGE_ENHANCER_SIZES,
} from '../constants.js';
import TileGrid from './tile-grid.js';

import {Input} from '../../input/index.js';
import Upload from '../../icon/upload.js';
import Search from '../../icon/search.js';
import {Select} from '../../select/index.js';
import ReactMapGL, {Marker, Layer, Source} from 'react-map-gl';
import {Button} from '../../button/index.js';

const uberHq = {
  latitude: 37.768495131168336,
  longitude: -122.38856031220648,
};

const pinheadSizes = Object.values(PINHEAD_SIZES_SHAPES).map(x => ({
  label: x,
  id: x,
}));

const needleSizes = Object.values(NEEDLE_SIZES).map(x => ({
  label: x,
  id: x,
}));

export function Scenario() {
  const [label, setLabel] = React.useState('Uber HQ');
  const [startEnhancer, setStartEnhancer] = React.useState(true);
  const [endEnhancer, setEndEnhancer] = React.useState(false);

  const [locations, setLocations] = React.useState([
    {position: [uberHq.longitude, uberHq.latitude], dragging: false},
  ]);

  const [showPointDebug, setShowPointDebug] = React.useState(true);

  const [viewport, setViewport] = React.useState({
    ...uberHq,
    zoom: 14,
  });

  const [pinheadSize, setPinheadSize] = React.useState([pinheadSizes[6]]);
  const [needleSize, setNeedleSize] = React.useState([needleSizes[3]]);
  const onMarkerDragStart = React.useCallback(index => {
    setLocations(l => {
      const copy = JSON.parse(JSON.stringify(l));
      copy[index].dragging = true;
      return copy;
    });
  }, []);

  const onMarkerDragEnd = React.useCallback((event, index) => {
    setLocations(l => {
      const copy = JSON.parse(JSON.stringify(l));
      copy[index].position = [event.lngLat[0], event.lngLat[1]];
      copy[index].dragging = false;
      return copy;
    });
  }, []);
  return (
    <>
      <TileGrid
        cols={6}
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
            options={pinheadSizes}
            value={pinheadSize}
            placeholder="Select a pinhead size"
            onChange={params => setPinheadSize(params.value)}
            key="pinhead-size"
          />,
          <Select
            options={needleSizes}
            value={needleSize}
            placeholder="Select a needle size"
            onChange={params => setNeedleSize(params.value)}
            key="needle-size"
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
      ></TileGrid>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="760px"
        onViewportChange={viewport => setViewport(viewport)}
        mapboxApiAccessToken="pk.eyJ1IjoiYmFiYnN1YmVyIiwiYSI6ImNrdThqeGkxZTVwb3kyd3BpZGRlc2NlOXUifQ.qh-EtXm2DJQZVprWUJ-GFQ"
        onClick={({lngLat}) =>
          setLocations(existing => [
            ...existing,
            {position: lngLat, dragging: false},
          ])
        }
      >
        {locations.map((x, i) => (
          <Marker
            latitude={x.position[1]}
            longitude={x.position[0]}
            draggable
            onDragStart={() => onMarkerDragStart(i)}
            onDragEnd={evt => onMarkerDragEnd(evt, i)}
            key={i}
          >
            <FixedMarker
              size={pinheadSize[0].id}
              needle={needleSize[0].id}
              key={i}
              label={label}
              dragging={x.dragging}
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
              overrides={{
                Root: {
                  style: () => ({
                    transform: `translate(-50%, -100%)`,
                  }),
                },
              }}
              badgeEnhancer={{
                size: BADGE_ENHANCER_SIZES.xSmall,
                color: 'white',
                background: 'green',
                content: 'hello',
              }}
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
                geometry: {type: 'Point', coordinates: x.position},
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
