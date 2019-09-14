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
export default function SvgBreadcrumbs(props) {
  const [, theme] = useStyletron();
  const colors = getFillColors(theme);
  return (
    <svg width={232} height={145} fill="none" {...props}>
      <path
        fill={colors[1]}
        d="M25 68h48v10H25zM86 72.923l-5.25 5.13v-10.26l5.25 5.13zM92 68h48v10H92z"
      />
      <path fill="#C4C4C4" d="M159 68h48v10h-48z" />
      <path d="M153 72.923l-5.25 5.13v-10.26l5.25 5.13z" fill={colors[1]} />
    </svg>
  );
}
