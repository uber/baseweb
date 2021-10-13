/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {useStyletron} from 'baseui';
import {Table} from 'baseui/table-semantic';
import {PINHEAD_SIZES_SHAPES, FLOATING_MARKER_SIZES} from 'baseui/map-marker';
import {PINHEAD_DIMENSIONS} from '../../src/map-marker/constants';
import {InlineCode} from './markdown-elements';

export const FixedMarkerSizingTable = () => {
  const PinheadShapeKeys = Object.keys(PINHEAD_SIZES_SHAPES);
  const columns = ['PINHEAD_SIZE_SHAPE', 'Enhancer size'];
  const data = [
    ...PinheadShapeKeys.filter(x => x.includes('xSmall')).map(key => [
      <InlineCode>{key}</InlineCode>,
      `n/a, enhancer cannot be provided on this shape/size`,
    ]),
    ...PinheadShapeKeys.filter(x => !x.includes('xSmall')).map(key => [
      <InlineCode>{key}</InlineCode>,
      // $FlowFixMe
      `${PINHEAD_DIMENSIONS[key].icon}px`,
    ]),
  ];
  return <Table columns={columns} data={data} />;
};

export const FloatingMarkerSizingTable = () => {
  const floatingMarkerKeys = Object.keys(FLOATING_MARKER_SIZES);
  const columns = ['FLOATING_MARKER_SIZE', 'Enhancer size'];
  const data = floatingMarkerKeys.map(key => [
    <InlineCode>{key}</InlineCode>,
    `${PINHEAD_DIMENSIONS[key].icon}px`,
  ]);
  return <Table columns={columns} data={data} />;
};
