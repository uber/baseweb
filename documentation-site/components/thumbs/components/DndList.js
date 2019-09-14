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
export default function SvgDndList(props) {
  const [, theme] = useStyletron();
  const colors = getFillColors(theme);
  return (
    <svg width={232} height={145} fill="none" {...props}>
      <path
        fill={colors[0]}
        d="M61 39h110v16H61zM61 70h110v16H61zM61 90h110v16H61z"
      />
      <path fill={colors[2]} d="M75 62h110v16H75z" />
      <path fill={colors[0]} d="M73 60h110v16H73z" />
    </svg>
  );
}
