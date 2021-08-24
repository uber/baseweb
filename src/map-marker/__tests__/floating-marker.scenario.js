/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {Select} from '../../select/index.js';
import {FloatingMarker} from '../index.js';
import {ANCHOR_POSITIONS, FLOATING_MARKER_SIZES} from '../constants.js';
import TileGrid from './tile-grid.js';
import {Checkbox, LABEL_PLACEMENT} from '../../checkbox/index.js';
import {Input} from '../../input/index.js';
import Upload from '../../icon/upload.js';
import Search from '../../icon/search.js';

export default function Scenario() {
  const markers = [];
  const [label, setLabel] = React.useState('Uber HQ');
  const [startEnhancer, setStartEnhancer] = React.useState(true);
  const [endEnhancer, setEndEnhancer] = React.useState(false);
  const [floatingAnchorPosition, setFloatingAnchorPosition] = React.useState([
    {id: 'top-left', label: 'top-left'},
  ]);

  Object.values(FLOATING_MARKER_SIZES).forEach((size, i) => {
    markers.push({
      id: `floating / ${size}`,
      content: (
        <FloatingMarker
          size={size}
          key={i}
          label={label}
          anchor={floatingAnchorPosition[0]?.id}
          startEnhancer={startEnhancer && <Upload />}
          endEnhancer={endEnhancer && <Search />}
        />
      ),
    });
  });

  return (
    <TileGrid
      customizerOptions={[
        <Select
          options={Object.values(ANCHOR_POSITIONS).map(x => ({
            label: x,
            id: x,
          }))}
          key={'anchor-position'}
          labelKey="id"
          valueKey="label"
          placeholder="Label position"
          onChange={({value}) => setFloatingAnchorPosition(value)}
          value={floatingAnchorPosition}
        />,

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
      ]}
    >
      {markers}
    </TileGrid>
  );
}
