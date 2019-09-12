/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';

const SvgRadio = props => (
  <svg width={232} height={145} fill="none" {...props}>
    <path fill="#E2E2E2" d="M90 47h65v12H90zM90 67h57v12H90zM90 87h80v12H90z" />
    <circle cx={69} cy={53} r={7} fill="#EEE" />
    <circle
      cx={69}
      cy={73}
      r={4.5}
      fill="#fff"
      stroke="#ABABAB"
      strokeWidth={5}
    />
    <circle cx={69} cy={93} r={7} fill="#EEE" />
  </svg>
);

export default SvgRadio;
