/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import {H6, H5, H4, H3, H2, H1} from '../index.js';

export const name = 'typography-heading';

export const component = () => (
  <div style={{width: '768px'}}>
    <H1>We ignite opportunity by setting the world in motion.</H1>
    <H2>We ignite opportunity by setting the world in motion.</H2>
    <H3>We ignite opportunity by setting the world in motion.</H3>
    <H4>We ignite opportunity by setting the world in motion.</H4>
    <H5>We ignite opportunity by setting the world in motion.</H5>
    <H6>We ignite opportunity by setting the world in motion.</H6>
  </div>
);
