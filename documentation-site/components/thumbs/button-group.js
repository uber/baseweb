/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {useStyletron} from 'baseui/styles';
import getFillColors from './getFillColors.js';

export default function SvgButtonGroup() {
  const [, theme] = useStyletron();
  const colors = getFillColors(theme);
  return (
    <svg width={232} height={145} fill="none">
      <path fill={colors[0]} d="M29 58h58v28H29z" />
      <path fill={colors[1]} d="M87 58h58v28H87z" />
      <path fill={colors[0]} d="M145 58h58v28h-58z" />
    </svg>
  );
}
