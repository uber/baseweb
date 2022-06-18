/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { FloatingRouteMarker } from '../index.js';
import {
  FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS,
  FLOATING_ROUTE_MARKER_STATES,
} from '../constants.js';
import TileGrid from './tile-grid.js';
import { Checkbox, LABEL_PLACEMENT } from '../../checkbox/index.js';
import { Input } from '../../input/index.js';
import Search from '../../icon/search.js';
import ChevronRight from '../../icon/chevron-right.js';
import { Select } from '../../select/index.js';

// import type { FloatingMarkerSizeT, AnchorPositionsT } from '../types.js';

const floatingRouteMarkerStates = [
  {
    label: 'true',
    id: true,
  },
  {
    label: 'false',
    id: false,
  },
];

export function Scenario() {
  const [label, setLabel] = React.useState('13 min');
  const [secondaryLabel, setSecondaryLabel] = React.useState('Cheaper');
  const [startEnhancer, setStartEnhancer] = React.useState(true);
  const [endEnhancer, setEndEnhancer] = React.useState(true);
  const [selected, setSelected] = React.useState(false);

  const markers = [];
  Object.keys(FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS)
    .map((key) => FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS[key])
    .forEach((position: AnchorPositionsT, x: number) => {
      markers.push({
        id: `floating / ${position}`,
        content: (
          <FloatingRouteMarker
            key={x}
            label={label}
            secondaryLabel={secondaryLabel}
            anchor={position}
            selected={selected}
            startEnhancer={
              startEnhancer
                ? function renderEnhancer({ size }) {
                    return <Search size={size} />;
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
          />
        ),
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
        <Checkbox
          checked={selected}
          onChange={(e) => setSelected(e.target.checked)}
          labelPlacement={LABEL_PLACEMENT.right}
          key="selected"
        >
          Selected
        </Checkbox>,
      ]}
    >
      {markers}
    </TileGrid>
  );
}
