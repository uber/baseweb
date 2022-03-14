/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { FloatingMarker } from '../index.js';
import {
  FLOATING_MARKER_ANCHOR_POSITIONS,
  FLOATING_MARKER_SIZES,
  FLOATING_MARKER_ANCHOR_TYPES,
} from '../constants.js';
import TileGrid from './tile-grid.js';
import { Checkbox, LABEL_PLACEMENT } from '../../checkbox/index.js';
import { Input } from '../../input/index.js';
import Upload from '../../icon/upload.js';
import Search from '../../icon/search.js';
import { Select } from '../../select/index.js';

import type { FloatingMarkerSizeT, AnchorPositionsT } from '../types.js';

const floatingMarkerAnchorTypes = Object.keys(FLOATING_MARKER_ANCHOR_TYPES)
  .map((key) => FLOATING_MARKER_ANCHOR_TYPES[key])
  .map((x) => ({
    label: x,
    id: x,
  }));

export function Scenario() {
  const [label, setLabel] = React.useState('Uber HQ');
  const [startEnhancer, setStartEnhancer] = React.useState(true);
  const [endEnhancer, setEndEnhancer] = React.useState(false);
  const [floatingMarkerAnchorType, setFloatingMarkerAnchorType] = React.useState([
    floatingMarkerAnchorTypes[0],
  ]);

  const markers = [];
  Object.keys(FLOATING_MARKER_SIZES)
    .map((key) => FLOATING_MARKER_SIZES[key])
    .forEach((size: FloatingMarkerSizeT, i: number) => {
      Object.keys(FLOATING_MARKER_ANCHOR_POSITIONS)
        .map((key) => FLOATING_MARKER_ANCHOR_POSITIONS[key])
        .forEach((position: AnchorPositionsT, x: number) => {
          markers.push({
            id: `floating / ${size} / ${position}`,
            content: (
              <FloatingMarker
                title="map marker"
                size={size}
                key={i}
                label={label}
                anchor={position}
                anchorType={floatingMarkerAnchorType[0].id}
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
                        return <Search size={size} />;
                      }
                    : undefined
                }
              />
            ),
          });
        });
    });

  return (
    <TileGrid
      cols={5}
      customizerOptions={[
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label"
          clearOnEscape
          key="label"
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
          options={floatingMarkerAnchorTypes}
          value={floatingMarkerAnchorType}
          placeholder="Select an anchor type"
          // $FlowFixMe Mismatch between general type and enum
          onChange={(params) => setFloatingMarkerAnchorType(params.value)}
          key="anchor-type"
        />,
      ]}
    >
      {markers}
    </TileGrid>
  );
}
