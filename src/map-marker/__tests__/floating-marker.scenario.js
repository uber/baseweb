/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {Select} from '../../select/index.js';
import {FloatingMarker} from '../index.js';
import {
  FLOATING_MARKER_ANCHOR_POSITIONS,
  FLOATING_MARKER_SIZES,
} from '../constants.js';
import TileGrid from './tile-grid.js';
import {Checkbox, LABEL_PLACEMENT} from '../../checkbox/index.js';
import {Input} from '../../input/index.js';
import Upload from '../../icon/upload.js';
import Search from '../../icon/search.js';

import type {FloatingMarkerSizeT} from '../types.js';

export default function Scenario() {
  const [label, setLabel] = React.useState('Uber HQ');
  const [startEnhancer, setStartEnhancer] = React.useState(true);
  const [endEnhancer, setEndEnhancer] = React.useState(false);
  const [floatingAnchorPosition, setFloatingAnchorPosition] = React.useState([
    {id: 'top-left', label: 'top-left'},
  ]);

  const markers = Object.values(FLOATING_MARKER_SIZES).map(
    //$FlowFixMe
    (size: FloatingMarkerSizeT, i: number) => ({
      id: `floating / ${size}`,
      content: (
        <FloatingMarker
          title="map marker"
          size={size}
          key={i}
          label={label}
          anchor={floatingAnchorPosition[0].id}
          startEnhancer={startEnhancer && <Upload />}
          endEnhancer={endEnhancer && <Search />}
        />
      ),
    }),
  );
  //$FlowFixMe
  const options = Object.values(FLOATING_MARKER_ANCHOR_POSITIONS).map(
    (x: string) => ({
      label: x,
      id: x,
    }),
  );

  return (
    <TileGrid
      // TODO: pass as children, make a separate component called "customization header"
      customizerOptions={[
        <Select
          options={options}
          key={'anchor-position'}
          labelKey="id"
          valueKey="label"
          placeholder="Label position"
          //$FlowFixMe
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
