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
  BADGE_ENHANCER_SIZES,
  LABEL_ENHANCER_POSITIONS,
} from '../constants.js';
import TileGrid from './tile-grid.js';
import {Input} from '../../input/index.js';
import Upload from '../../icon/upload.js';
import Search from '../../icon/search.js';
import {Select} from '../../select/index.js';

import type {PinHeadSizeT, NeedleSizeT} from '../types.js';

const labelEnhancerPositions = Object.keys(LABEL_ENHANCER_POSITIONS)
  .map(key => LABEL_ENHANCER_POSITIONS[key])
  .map(x => ({
    id: x,
    label: x,
  }));

const badgeEnhancerSizes = Object.keys(BADGE_ENHANCER_SIZES)
  .map(key => BADGE_ENHANCER_SIZES[key])
  .map(x => ({
    label: x,
    id: x,
  }));

const BadgeEnhancerIcon = ({size}) => <Search size={size} />;
const BadgeEnhancerText = ({size}) => 'Search';

export function Scenario() {
  const markers = [];
  const [dragging, setDragging] = React.useState(false);
  const [label, setLabel] = React.useState('Uber HQ');
  const [startEnhancer, setStartEnhancer] = React.useState(true);
  const [endEnhancer, setEndEnhancer] = React.useState(false);

  const [labelEnhancerText, setLabelEnhancerText] = React.useState('Uber Eats');

  const [labelEnhancerPosition, setLabelEnhancerPosition] = React.useState([
    labelEnhancerPositions[0],
  ]);

  const [badgeEnhancerSize, setBadgeEnhancerSize] = React.useState([
    badgeEnhancerSizes[0],
  ]);

  const BadgeEnhancerContent =
    badgeEnhancerSize[0].id === BADGE_ENHANCER_SIZES.mediumText
      ? BadgeEnhancerText
      : BadgeEnhancerIcon;

  Object.keys(PINHEAD_SIZES_SHAPES)
    .map(key => PINHEAD_SIZES_SHAPES[key])
    .forEach((pinheadSize: PinHeadSizeT, i: number) => {
      Object.keys(NEEDLE_SIZES)
        .map(key => NEEDLE_SIZES[key])
        .forEach((needleSize: NeedleSizeT, z: number) => {
          markers.push({
            id: `fixed / ${pinheadSize} / ${needleSize}`,
            content: (
              <FixedMarker
                size={pinheadSize}
                needle={needleSize}
                key={i}
                label={label}
                dragging={dragging}
                startEnhancer={
                  startEnhancer
                    ? function renderEnhancer({size}) {
                        return <Upload size={size} />;
                      }
                    : undefined
                }
                endEnhancer={
                  endEnhancer
                    ? function renderEnhancer({size}) {
                        return <Search size={size} />;
                      }
                    : undefined
                }
                labelEnhancerContent={labelEnhancerText}
                labelEnhancerPosition={labelEnhancerPosition[0].id}
                badgeEnhancerSize={badgeEnhancerSize[0].id}
                badgeEnhancerColor={null}
                badgeEnhancerBackground={null}
                badgeEnhancerContent={BadgeEnhancerContent}
              />
            ),
          });
        });
    });

  return (
    <TileGrid
      cols={6}
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
        <Input
          value={labelEnhancerText}
          onChange={e => setLabelEnhancerText(e.target.value)}
          placeholder="Label enhancer"
          clearOnEscape
          key="label-enhancer-text"
        />,
        <Select
          options={labelEnhancerPositions}
          value={labelEnhancerPosition}
          placeholder="Select an anchor position"
          // $FlowFixMe Mismatch between general type and enum
          onChange={params => setLabelEnhancerPosition(params.value)}
          key="anchor-position"
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
        <Select
          options={badgeEnhancerSizes}
          value={badgeEnhancerSize}
          placeholder="Select an anchor position"
          // $FlowFixMe Mismatch between general type and enum
          onChange={params => setBadgeEnhancerSize(params.value)}
          key="badge-enhancer-size"
        />,
      ]}
    >
      {markers}
    </TileGrid>
  );
}
