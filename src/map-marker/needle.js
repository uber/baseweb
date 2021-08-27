/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {NEEDLE_HEIGHTS} from './constants.js';
import {StyledNeedle} from './styled-components.js';
import type {NeedlePropsT} from './types.js';

const Needle = ({size, background}: NeedlePropsT) => (
  <StyledNeedle background={background} height={NEEDLE_HEIGHTS[size]} />
);

export default Needle;
