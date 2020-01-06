/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import {H6, H5, H4, H3, H2, H1} from '../index.js';

export const name = 'typography-heading';

const textString = 'We ignite opportunity by setting the world in motion.';

export const component = () => (
  <React.Fragment>
    <H6>{`H6 - ${textString}`}</H6>
    <H5>{`H5 - ${textString}`}</H5>
    <H4>{`H4 - ${textString}`}</H4>
    <H3>{`H3 - ${textString}`}</H3>
    <H2>{`H2 - ${textString}`}</H2>
    <H1>{`H1 - ${textString}`}</H1>
  </React.Fragment>
);
