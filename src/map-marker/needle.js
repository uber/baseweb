/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {StyledNeedle} from './styled-components.js';
import type {NeedlePropsT} from './types.js';

const heights = {
  none: 0,
  short: 4,
  medium: 12,
  tall: 20,
};

const Needle = ({size, background}: NeedlePropsT) => {
  return <StyledNeedle background={background} height={heights[size]} />;
};

export default Needle;
