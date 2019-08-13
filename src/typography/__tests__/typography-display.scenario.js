/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {Block} from '../../block/index.js';
import {Display1, Display2, Display3, Display4} from '../index.js';

export const name = 'typography-display';

export const component = () => (
  <Block width="800px">
    <Block marginBottom="30px">
      <Display1>We ignite opportunity by setting the world in motion.</Display1>
    </Block>
    <Block marginBottom="30px">
      <Display2>We ignite opportunity by setting the world in motion.</Display2>
    </Block>
    <Block marginBottom="30px">
      <Display3>We ignite opportunity by setting the world in motion.</Display3>
    </Block>
    <Block marginBottom="30px">
      <Display4>We ignite opportunity by setting the world in motion.</Display4>
    </Block>
  </Block>
);
