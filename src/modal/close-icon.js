/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

// TODO Switch to using Icon component once it exists
export function CloseIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      style={{stroke: 'currentColor'}}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 1L5 5M1 9L5 5M5 5L1 1M5 5L9 9"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
