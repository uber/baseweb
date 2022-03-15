/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { getOverrides } from '../helpers/overrides.js';
import { NEEDLE_HEIGHTS } from './constants.js';
import { StyledNeedle } from './styled-components.js';
import type { NeedlePropsT } from './types.js';

const Needle = ({ size, background, overrides = {} }: NeedlePropsT) => {
  const [Needle, needleProps] = getOverrides(overrides.Needle, StyledNeedle);
  return <Needle $background={background} $height={NEEDLE_HEIGHTS[size]} {...needleProps} />;
};

export default Needle;
