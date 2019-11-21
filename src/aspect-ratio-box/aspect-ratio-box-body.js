/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import Block from '../block/block.js';
import type {BlockPropsT} from '../block/types.js';

export const AspectRatioBoxBody = (props: BlockPropsT): React.Node => (
  <Block
    {...props}
    data-baseweb="aspect-ratio-box-body"
    position={props.position || 'absolute'}
    top={props.top || 0}
    bottom={props.bottom || 0}
    width={props.width || '100%'}
  />
);

export default AspectRatioBoxBody;
