/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { FloatingRouteMarker } from '../index.js';
import { FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS } from '../constants.js';
import TileGrid from './tile-grid.js';
import { Checkbox, LABEL_PLACEMENT } from '../../checkbox/index.js';
import { Input } from '../../input/index.js';
import Upload from '../../icon/upload.js';
import ChevronRight from '../../icon/chevron-right.js';

import { Select } from '../../select/index.js';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Button } from '../../button/index.js';
import { useStyletron } from '../../styles/index.js';
import { getMapStyle } from './map-style.js';

const uberHq = {
  latitude: 37.768495131168336,
  longitude: -122.38856031220648,
};

const floatingRouteMarkerAnchorPositions = Object.keys(FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS)
  .map((key) => FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS[key])
  .map((x) => ({
    label: x,
    id: x,
  }));

const defaultLocation = [uberHq.longitude, uberHq.latitude];

export function Scenario() {
  const [label, setLabel] = React.useState('13 min');
  const [secondaryLabel, setSecondaryLabel] = React.useState('Cheaper');

  const [startEnhancer, setStartEnhancer] = React.useState(true);
  const [endEnhancer, setEndEnhancer] = React.useState(false);

  const [floatingRouteMarkerAnchorPosition, setFloatingRouteMarkerAnchorPosition] = React.useState([
    floatingRouteMarkerAnchorPositions[0],
  ]);

  const [locations, setLocations] = React.useState([defaultLocation]);

  const [showPointDebug, setShowPointDebug] = React.useState(true);

  const [viewport, setViewport] = React.useState({
    ...uberHq,
    zoom: 14,
  });

  const [css, theme] = useStyletron();

  const mapStyle = getMapStyle(locations, { showPointDebug });

  return (
    <>
      <TileGrid
        cols={7}
        customizerOptions={[
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label"
            clearOnEscape
            key="label"
          />,
          <Input
            value={secondaryLabel}
            onChange={(e) => setSecondaryLabel(e.target.value)}
            placeholder="Secondary Label"
            clearOnEscape
            key="secondary label"
          />,
          <Checkbox
            checked={startEnhancer}
            onChange={(e) => setStartEnhancer(e.target.checked)}
            labelPlacement={LABEL_PLACEMENT.right}
            key="start-endhancer"
          >
            Start enhancer
          </Checkbox>,
          <Checkbox
            checked={endEnhancer}
            onChange={(e) => setEndEnhancer(e.target.checked)}
            labelPlacement={LABEL_PLACEMENT.right}
            key="end-enhancer"
          >
            End enhancer
          </Checkbox>,
          <Select
            options={floatingRouteMarkerAnchorPositions}
            value={floatingRouteMarkerAnchorPosition}
            placeholder="Select an anchor position"
            onChange={(params) => setFloatingRouteMarkerAnchorPosition(params.value)}
            key="anchor-position"
          />,
          <Button onClick={() => setLocations([])} key="clear-markers">
            Clear markers
          </Button>,
          <Checkbox
            checked={showPointDebug}
            onChange={(e) => setShowPointDebug(e.target.checked)}
            labelPlacement={LABEL_PLACEMENT.right}
            key="point-debug"
          >
            Show point debug
          </Checkbox>,
        ]}
      />
      <div className={css({ backgroundColor: theme.colors.backgroundLightAccent })}>
        <ReactMapGL
          {...viewport}
          width="100%"
          height="760px"
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle={mapStyle}
          onClick={({ lngLat }) => setLocations((existing) => [...existing, lngLat])}
        >
          {locations.map((x, i) => (
            <Marker latitude={x[1]} longitude={x[0]} key={i}>
              <FloatingRouteMarker
                overrides={{
                  Root: {
                    style: () => ({
                      transform: `translate(-50%, -50%)`,
                    }),
                  },
                }}
                label={label}
                secondaryLabel={secondaryLabel}
                startEnhancer={
                  startEnhancer
                    ? function renderEnhancer({ size }) {
                        return <Upload size={size} />;
                      }
                    : undefined
                }
                endEnhancer={
                  endEnhancer
                    ? function renderEnhancer({ size }) {
                        return <ChevronRight size={size} />;
                      }
                    : undefined
                }
                // $FlowFixMe Mismatch between general type and enum
                anchor={floatingRouteMarkerAnchorPosition[0].id}
              />
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    </>
  );
}
