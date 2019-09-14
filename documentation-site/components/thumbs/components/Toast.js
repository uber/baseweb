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
export default function SvgToast(props) {
  const [, theme] = useStyletron();
  const colors = getFillColors(theme);
  return (
    <svg width={232} height={145} fill="none" {...props}>
      <path fill={colors[2]} d="M91 100h123v27H91z" />
      <path fill={colors[0]} d="M89 98h123v27H89z" />
      <path
        d="M204.64 106.24l-.88-.88-2.76 2.8-2.76-2.8-.88.88 2.8 2.76-2.8 2.76.88.88 2.76-2.8 2.76 2.8.88-.88-2.8-2.76 2.8-2.76z"
        fill={colors[2]}
      />
    </svg>
  );
}
