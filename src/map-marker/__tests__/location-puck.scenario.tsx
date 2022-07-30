/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { LOCATION_PUCK_SIZES, LOCATION_PUCK_TYPES } from '../constants';
import TileGrid from './tile-grid';
import { Slider } from '../../slider';
import { LocationPuck } from '..';
import type { LocationPuckSize, LocationPuckType } from '../types';
import { Checkbox, LABEL_PLACEMENT } from '../../checkbox';

export function Scenario() {
  const markers = [];

  const [confidenceRadius, setConfidenceRadius] = React.useState([100]);
  const [heading, setHeading] = React.useState([0]);
  const [showHeading, setShowHeading] = React.useState(true);

  Object.keys(LOCATION_PUCK_SIZES)
    .map((key) => LOCATION_PUCK_SIZES[key])
    .forEach((size: LocationPuckSize) => {
      Object.keys(LOCATION_PUCK_TYPES)
        .map((key) => LOCATION_PUCK_TYPES[key])
        .forEach((type: LocationPuckType) => {
          markers.push({
            id: `${size} / ${type}`,
            content: (
              <LocationPuck
                size={size}
                type={type}
                heading={heading[0]}
                confidenceRadius={confidenceRadius[0]}
                showHeading={showHeading}
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
          value={heading}
          onChange={({ value }) => value && setHeading(value)}
          min={0}
          max={360}
          key={'heading'}
        />,
        <Slider
          value={confidenceRadius}
          onChange={({ value }) => value && setConfidenceRadius(value)}
          min={0}
          max={500}
          key={'confidence-radius'}
        />,
        <Checkbox
          checked={showHeading}
          onChange={(e) => setShowHeading(e.target.checked)}
          labelPlacement={LABEL_PLACEMENT.right}
          key={'show-heading'}
        >
          Show heading
        </Checkbox>,
      ]}
    >
      {markers}
    </TileGrid>
  );
}
