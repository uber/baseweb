/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {
  LOCATION_PUCK_SIZES,
  LOCATION_PUCK_TYPES,
  LOCATION_PUCK_CONFIDENCES,
} from '../constants.js';
import TileGrid from './tile-grid.js';
import { Slider } from '../../slider/index.js';
import LocationPuck from '../location-puck.js';
import type { LocationPuckSizeT, LocationPuckTypeT } from '../types.js';
import { Select } from '../../select/index.js';

const locationPuckConfidences = Object.keys(LOCATION_PUCK_CONFIDENCES)
  .map((key) => LOCATION_PUCK_CONFIDENCES[key])
  .map((x) => ({
    label: x,
    id: x,
  }));

export function Scenario() {
  const markers = [];

  const [confidence, setConfidence] = React.useState([locationPuckConfidences[0]]);

  const [bearing, setBearing] = React.useState([0]);

  Object.keys(LOCATION_PUCK_SIZES)
    .map((key) => LOCATION_PUCK_SIZES[key])
    .forEach((size: LocationPuckSizeT, i: number) => {
      Object.keys(LOCATION_PUCK_TYPES)
        .map((key) => LOCATION_PUCK_TYPES[key])
        .forEach((type: LocationPuckTypeT, z: number) => {
          markers.push({
            id: `${size} / ${type}`,
            content: (
              <LocationPuck
                size={size}
                type={type}
                bearing={bearing[0]}
                confidence={confidence[0].id}
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
        <Select
          options={locationPuckConfidences}
          value={confidence}
          placeholder="Select a puck confidence"
          onChange={(params) => setConfidence(params.value)}
          key="confidence"
        />,
      ]}
    >
      {markers}
    </TileGrid>
  );
}
