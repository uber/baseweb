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
export default function SvgPopover(props) {
  const [, theme] = useStyletron();
  const colors = getFillColors(theme);
  return (
    <svg width={232} height={145} fill="none" {...props}>
      <path fill={colors[1]} d="M80 48h38v16H80z" />
      <path fill={colors[2]} d="M111 58h40v40h-40z" />
      <path fill={colors[0]} d="M109 56h40v40h-40z" />
    </svg>
  );
}
