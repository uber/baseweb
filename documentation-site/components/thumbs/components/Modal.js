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
export default function SvgModal(props) {
  const [, theme] = useStyletron();
  const colors = getFillColors(theme);
  return (
    <svg width={232} height={145} fill="none" {...props}>
      <path fill={colors[1]} d="M0 0h232v145H0z" />
      <path fill={colors[2]} d="M60 39h116v72H60z" />
      <path fill={colors[0]} d="M58 37h116v72H58z" />
      <path
        d="M165.28 44.88l-.88-.88-2.76 2.8-2.76-2.8-.88.88 2.8 2.76-2.8 2.76.88.88 2.76-2.8 2.76 2.8.88-.88-2.8-2.76 2.8-2.76z"
        fill={colors[2]}
      />
    </svg>
  );
}
