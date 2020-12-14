/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

const Maestro = ({size}: {size: string}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23 4H1V20H23V4Z" fill="#000166" />
    <path
      d="M9 17C11.7614 17 14 14.7614 14 12C14 9.23858 11.7614 7 9 7C6.23858 7 4 9.23858 4 12C4 14.7614 6.23858 17 9 17Z"
      fill="#06C"
    />
    <path
      d="M15 7C13.37 7 11.94 7.79 11.02 9H12.97C13.2 9.31 13.41 9.64 13.57 10H10.41C10.27 10.32 10.16 10.65 10.09 11H13.89C13.96 11.32 13.99 11.66 13.99 12H9.98999C9.98999 12.34 10.03 12.68 10.09 13H13.89C13.82 13.35 13.71 13.68 13.57 14H10.41C10.57 14.36 10.78 14.69 11.01 15H12.96C12.68 15.37 12.35 15.7 11.98 15.98C12.82 16.61 13.85 17 14.98 17C17.74 17 19.98 14.76 19.98 12C19.98 9.24 17.76 7 15 7Z"
      fill="#CC0001"
    />
  </svg>
);

export default Maestro;
