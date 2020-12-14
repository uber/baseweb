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

const PencilIcon = (props: PropT) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 20 18"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      fill={props.color}
      d="M0,14.2 L0,18 L3.8,18 L14.8,6.9 L11,3.1 L0,14.2 L0,14.2 Z M17.7,4 C18.1,3.6 18.1,3 17.7,2.6 L15.4,0.3 C15,-0.1 14.4,-0.1 14,0.3 L12.2,2.1 L16,5.9 L17.7,4 L17.7,4 Z M9,16 L7,18 L20,18 L20,16 L9,16 L9,16 Z"
    />
  </svg>
);

export default PencilIcon;
