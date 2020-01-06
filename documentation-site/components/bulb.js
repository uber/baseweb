/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

type PropT = {
  size: number,
  color: string,
};

const Bulb = (props: PropT) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <g
      transform="matrix(
      1 0
      0 1
      4 1
    )"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.3999 11C15.7999 10.1 16 9 16 8C16 3.6 12.4 0 8 0C3.6 0 0 3.6 0 8C0 9.1 0.200098 10.1 0.600098 11L2.19995 15L13.8 15L15.3999 11ZM11 22L12.6001 18L3.3999 18L5 22L11 22Z"
        fill={props.color}
        opacity="1"
      />
    </g>
  </svg>
);

export default Bulb;
