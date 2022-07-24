/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { LOCATION_PUCK_SIZES, LOCATION_PUCK_TYPES } from '../constants.js';
import TileGrid from './tile-grid.js';
import { Slider } from '../../slider/index.js';
import LocationPuck from '../location-puck.js';
import type { LocationPuckSizeT, LocationPuckTypeT } from '../types.js';
import { Checkbox, LABEL_PLACEMENT } from '../../checkbox/index.js';

export function Scenario() {
  const markers = [];

  const [confidenceRadius, setConfidenceRadius] = React.useState([100]);
  const [bearing, setBearing] = React.useState([0]);
  const [showBearing, setShowBearing] = React.useState(true);

  Object.keys(LOCATION_PUCK_SIZES)
    .map((key) => LOCATION_PUCK_SIZES[key])
    .forEach((size: LocationPuckSizeT) => {
      Object.keys(LOCATION_PUCK_TYPES)
        .map((key) => LOCATION_PUCK_TYPES[key])
        .forEach((type: LocationPuckTypeT) => {
          markers.push({
            id: `${size} / ${type}`,
            content: (
              <LocationPuck
                size={size}
                type={type}
                bearing={bearing[0]}
                confidenceRadius={confidenceRadius[0]}
                showBearing={showBearing}
              />
            ),
          });
        });
    });

  return (
    <TileGrid
      cols={2}
      customizerOptions={[
        <Slider
          value={bearing}
          onChange={({ value }) => value && setBearing(value)}
          min={0}
          max={360}
          key={'bearing'}
        />,
        <Slider
          value={confidenceRadius}
          onChange={({ value }) => value && setConfidenceRadius(value)}
          min={0}
          max={500}
          key={'confidence-radius'}
        />,
        <Checkbox
          checked={showBearing}
          onChange={(e) => setShowBearing(e.target.checked)}
          labelPlacement={LABEL_PLACEMENT.right}
          key={'show-bearing'}
        >
          Show bearing
        </Checkbox>,
      ]}
    >
      {markers}
    </TileGrid>
  );
}
