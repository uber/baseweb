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
export default function SvgTag(props) {
  const [, theme] = useStyletron();
  const colors = getFillColors(theme);
  return (
    <svg width={232} height={145} fill="none" {...props}>
      <rect x={61} y={65} width={50} height={16} rx={8} fill={colors[0]} />
      <path
        d="M103.64 70.24l-.88-.88-2.76 2.8-2.76-2.8-.88.88 2.8 2.76-2.8 2.76.88.88 2.76-2.8 2.76 2.8.88-.88-2.8-2.76 2.8-2.76z"
        fill={colors[2]}
      />
      <rect x={121} y={65} width={50} height={16} rx={8} fill={colors[2]} />
      <path
        d="M163.64 70.24l-.88-.88-2.76 2.8-2.76-2.8-.88.88 2.8 2.76-2.8 2.76.88.88 2.76-2.8 2.76 2.8.88-.88-2.8-2.76 2.8-2.76z"
        fill={colors[0]}
      />
    </svg>
  );
}
