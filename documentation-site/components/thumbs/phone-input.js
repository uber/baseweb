/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {useStyletron} from 'baseui/styles';
import getFillColors from './getFillColors.js';

export default function SvgPhoneInput() {
  const [, theme] = useStyletron();
  const colors = getFillColors(theme);
  return (
    <svg width={232} height={145} fill="none">
      <path fill={colors[0]} d="M29 58h174v28H29z" />
      <path fill={[colors[1]]} d="M39 64h22.5v15H39z" />
      <path fill={[colors[1]]} d="M69.923 75l-5.13-5.25h10.26L69.923 75z" />
    </svg>
  );
}
