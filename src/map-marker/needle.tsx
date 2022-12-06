/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import { NEEDLE_HEIGHTS } from './constants';
import { StyledNeedle } from './styled-components';
import type { NeedleProps } from './types';

const Needle = ({ size, background, overrides = {} }: NeedleProps) => {
  const [Needle, needleProps] = getOverrides(overrides.Needle, StyledNeedle);
  // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
  return <Needle $background={background} $height={NEEDLE_HEIGHTS[size]} {...needleProps} />;
};

export default Needle;
