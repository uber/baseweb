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
export default function SvgPagination(props) {
  const [, theme] = useStyletron();
  const colors = getFillColors(theme);
  return (
    <svg width={232} height={145} fill="none" {...props}>
      <path fill="#C4C4C4" d="M139 65h46v16h-46z" />
      <path d="M179 73.23l-3.75 3.665v-7.328L179 73.23z" fill={colors[0]} />
      <path fill="#C4C4C4" d="M92 81H46V65h46z" />
      <path d="M52 72.77l3.75-3.665v7.328L52 72.77z" fill={colors[0]} />
      <path fill={colors[1]} d="M99 65h33v16H99z" />
    </svg>
  );
}
