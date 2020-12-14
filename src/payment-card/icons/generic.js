/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

const Generic = ({size}: {size: string}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23 4H1V20H23V4Z" fill="#C9C9CD" />
    <path d="M6 15H3V16H6V15Z" fill="#fff" />
    <path d="M11 15H8V16H11V15Z" fill="#fff" />
    <path d="M16 15H13V16H16V15Z" fill="#fff" />
    <path d="M21 15H18V16H21V15Z" fill="#fff" />
    <path d="M21 6H16V10H21V6Z" fill="#ABABB3" />
  </svg>
);

export default Generic;
