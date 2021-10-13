/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {FixedMarker} from '../index.js';
import {Checkbox, LABEL_PLACEMENT} from '../../checkbox/index.js';
import {
  PINHEAD_SIZES_SHAPES,
  NEEDLE_SIZES,
  PINHEAD_DIMENSIONS,
} from '../constants.js';
import TileGrid from './tile-grid.js';
import {Input} from '../../input/index.js';
import Upload from '../../icon/upload.js';
import Search from '../../icon/search.js';

import type {PinHeadSizeT, NeedleSizeT} from '../types.js';

export default function Scenario() {
  const markers = [];
  const [dragging, setDragging] = React.useState(false);
  const [label, setLabel] = React.useState('Uber HQ');
  const [startEnhancer, setStartEnhancer] = React.useState(true);
  const [endEnhancer, setEndEnhancer] = React.useState(false);

  Object.values(PINHEAD_SIZES_SHAPES).forEach(
    // $FlowFixMe
    (pinheadSize: PinHeadSizeT, i: number) => {
      Object.values(NEEDLE_SIZES).forEach(
        // $FlowFixMe
        (needleSize: NeedleSizeT, z: number) => {
          markers.push({
            id: `fixed / ${pinheadSize} / ${needleSize}`,
            content: (
              <FixedMarker
                title="map marker"
                size={pinheadSize}
                needle={needleSize}
                key={i}
                label={label}
                dragging={dragging}
                {...(startEnhancer
                  ? {
                      startEnhancer: (
                        <Upload
                        // size={`${PINHEAD_DIMENSIONS[pinheadSize].icon}px`}
                        />
                      ),
                    }
                  : {})}
                {...(endEnhancer
                  ? {
                      endEnhancer: (
                        <Search
                        // size={`${PINHEAD_DIMENSIONS[pinheadSize].icon}px`}
                        />
                      ),
                    }
                  : {})}
              />
            ),
          });
        },
      );
    },
  );

  return (
    <TileGrid
      cols={4}
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
          onChange={e => setStartEnhancer(Boolean(e.target.checked))}
          labelPlacement={LABEL_PLACEMENT.right}
          key="start-enhancer"
        >
          Start enhancer
        </Checkbox>,
        <Checkbox
          checked={endEnhancer}
          onChange={e => setEndEnhancer(Boolean(e.target.checked))}
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
