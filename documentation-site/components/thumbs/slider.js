/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {useStyletron} from 'baseui/styles';
import getFillColors from './getFillColors.js';

export default function SvgSlider() {
  const [, theme] = useStyletron();
  const colors = getFillColors(theme);
  return (
    <svg width={232} height={145} fill="none">
      <path fill={colors[0]} d="M29 72h174v2H29z" />
      <path fill={colors[2]} d="M29 72h87v2H29z" />
      <circle cx={116} cy={73} r={7} fill={colors[2]} />
    </svg>
  );
}
