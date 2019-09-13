/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {useStyletron} from 'baseui/styles';
import getFillColors from './getFillColors.js';

export default function SvgTextarea() {
  const [, theme] = useStyletron();
  const colors = getFillColors(theme);
  return (
    <svg width={232} height={145} fill="none">
      <path fill={colors[0]} d="M29 44h174v56H29z" />
      <path
        d="M194.138 91.138l-7.34-.085 7.255-7.254.085 7.339z"
        fill={colors[2]}
      />
    </svg>
  );
}
