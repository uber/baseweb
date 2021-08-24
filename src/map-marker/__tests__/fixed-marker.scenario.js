/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {FixedMarker} from '../index.js';
import {Checkbox, LABEL_PLACEMENT} from '../../checkbox/index.js';
import {PINHEAD_SIZES, NEEDLE_SIZES} from '../constants.js';
import TileGrid from './tile-grid.js';
import {Input} from '../../input/index.js';
import Upload from '../../icon/upload.js';
import Search from '../../icon/search.js';

export default function Scenario() {
  const markers = [];
  const [dragging, setDragging] = React.useState(false);
  const [label, setLabel] = React.useState('Uber HQ');
  const [startEnhancer, setStartEnhancer] = React.useState(true);
  const [endEnhancer, setEndEnhancer] = React.useState(false);

  Object.values(PINHEAD_SIZES).forEach((pinheadSize, i) => {
    Object.values(NEEDLE_SIZES).forEach((needleSize, z) => {
      markers.push({
        id: `fixed / ${pinheadSize} / ${needleSize}`,
        content: (
          <FixedMarker
            size={pinheadSize}
            needle={needleSize}
            key={i}
            label={label}
            dragging={dragging}
            startEnhancer={startEnhancer && <Upload />}
            endEnhancer={endEnhancer && <Search />}
          />
        ),
      });
    });
  });

  return (
    <TileGrid
      customizerOptions={[
        <Checkbox
          checked={dragging}
          onChange={e => setDragging(e.target.checked)}
          labelPlacement={LABEL_PLACEMENT.right}
          key="dragging"
        >
          Dragging
        </Checkbox>,
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
          key="start-enhancer"
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
      ]}
    >
      {markers}
    </TileGrid>
  );
}
