/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { FloatingMarker } from '..';
import {
  FLOATING_MARKER_ANCHOR_POSITIONS,
  FLOATING_MARKER_SIZES,
  FLOATING_MARKER_ANCHOR_TYPES,
} from '../constants';
import TileGrid from './tile-grid';
import { Checkbox, LABEL_PLACEMENT } from '../../checkbox';
import { Input } from '../../input';
import Upload from '../../icon/upload';
import Search from '../../icon/search';
import { Select } from '../../select';
import type { FloatingMarkerSize, AnchorPositions } from '../types';

const floatingMarkerAnchorTypes = Object.keys(FLOATING_MARKER_ANCHOR_TYPES)
  .map((key) => FLOATING_MARKER_ANCHOR_TYPES[key])
  .map((x) => ({
    label: x,
    id: x,
  }));

export function Scenario() {
  const [label, setLabel] = React.useState('Uber HQ');
  const [secondaryLabel, setSecondaryLabel] = React.useState('Pickup');
  const [startEnhancer, setStartEnhancer] = React.useState(true);
  const [endEnhancer, setEndEnhancer] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [floatingMarkerAnchorType, setFloatingMarkerAnchorType] = React.useState<any>([
    floatingMarkerAnchorTypes[0],
  ]);

  const markers = [];
  Object.keys(FLOATING_MARKER_SIZES)
    .map((key) => FLOATING_MARKER_SIZES[key])
    .forEach((size: FloatingMarkerSize, i: number) => {
      Object.keys(FLOATING_MARKER_ANCHOR_POSITIONS)
        .map((key) => FLOATING_MARKER_ANCHOR_POSITIONS[key])
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .forEach((position: AnchorPositions, x: number) => {
          markers.push({
            id: `floating / ${size} / ${position}`,
            content: (
              <FloatingMarker
                size={size}
                key={i}
                label={label}
                secondaryLabel={secondaryLabel}
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
        <Input
          value={secondaryLabel}
          onChange={(e) => setSecondaryLabel(e.target.value)}
          placeholder="Secondary Label"
          clearOnEscape
          key="secondary-label"
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
          onChange={(params) => setFloatingMarkerAnchorType(params.value)}
          key="anchor-type"
        />,
      ]}
    >
      {markers}
    </TileGrid>
  );
}
