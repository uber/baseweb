/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';

const SvgButtonGroup = props => (
  <svg width={232} height={145} fill="none" {...props}>
    <path fill="#EEE" d="M29 58h58v28H29z" />
    <path fill="#CBCBCB" d="M87 58h58v28H87z" />
    <path fill="#EEE" d="M145 58h58v28h-58z" />
  </svg>
);

export default SvgButtonGroup;
