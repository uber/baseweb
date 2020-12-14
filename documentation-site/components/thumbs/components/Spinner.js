/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* THIS FILE IS AUTO-GENERATED. DO NOT MODIFY. */
/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react';
export default function SvgSpinner(props) {
  return (
    <svg width={232} height={145} fill="none" {...props}>
      <circle
        cx={116}
        cy={73}
        r={15.5}
        stroke={props.colors[0]}
        strokeWidth={3}
      />
      <mask id="spinner_svg__a" fill="#fff">
        <path d="M116 57.497c0-.827.671-1.504 1.495-1.431a17.002 17.002 0 0115.503 16.67 16.991 16.991 0 01-1.44 7.115c-.333.757-1.25 1.019-1.974.62-.724-.398-.981-1.306-.662-2.068a14.003 14.003 0 00-11.428-19.33c-.822-.087-1.494-.75-1.494-1.576z" />
      </mask>
      <path
        d="M116 57.497c0-.827.671-1.504 1.495-1.431a17.002 17.002 0 0115.503 16.67 16.991 16.991 0 01-1.44 7.115c-.333.757-1.25 1.019-1.974.62-.724-.398-.981-1.306-.662-2.068a14.003 14.003 0 00-11.428-19.33c-.822-.087-1.494-.75-1.494-1.576z"
        stroke={props.colors[2]}
        strokeWidth={6}
        mask="url(#spinner_svg__a)"
      />
    </svg>
  );
}
