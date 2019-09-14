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
export default function SvgTable(props) {
  const [, theme] = useStyletron();
  const colors = getFillColors(theme);
  return (
    <svg width={232} height={145} fill="none" {...props}>
      <path
        fill={colors[0]}
        d="M47 55h138v10H47zM47 67h138v10H47zM47 79h138v10H47zM47 91h138v10H47z"
      />
      <path
        fill={colors[1]}
        d="M47 43h26v10H47zM75 43h26v10H75zM103 43h26v10h-26zM131 43h26v10h-26zM159 43h26v10h-26z"
      />
    </svg>
  );
}
