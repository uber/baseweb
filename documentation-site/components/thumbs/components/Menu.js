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
export default function SvgMenu(props) {
  const [, theme] = useStyletron();
  const colors = getFillColors(theme);
  return (
    <svg width={232} height={145} fill="none" {...props}>
      <path fill={colors[0]} d="M81 35h71v76H81z" />
      <path
        fill={colors[1]}
        d="M89 42h45v6H89zM89 60h45v6H89zM81 74h71v14H81z"
      />
      <path fill={colors[2]} d="M89 78h45v6H89z" />
      <path fill={colors[1]} d="M89 96h45v6H89z" />
    </svg>
  );
}
