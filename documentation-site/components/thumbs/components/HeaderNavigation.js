/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* THIS FILE IS AUTO-GENERATED. DO NOT MODIFY. */
/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react';
import {useStyletron} from 'baseui/styles';
import getFillColors from '../getFillColors.js';
export default function SvgHeaderNavigation(props) {
  const [, theme] = useStyletron();
  const colors = getFillColors(theme);
  return (
    <svg width={232} height={145} fill="none" {...props}>
      <path fill={colors[1]} d="M27 83h177v1H27z" />
      <path fill={colors[2]} d="M174 68h30v10h-30zM136 68h30v10h-30z" />
      <circle cx={32} cy={73} r={5} fill={colors[1]} />
    </svg>
  );
}
