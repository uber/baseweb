/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

const Mastercard = ({size}: {size: string}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23 4H1V20H23V4Z" fill="#3F3F4E" />
    <path
      d="M9 17C11.7614 17 14 14.7614 14 12C14 9.23858 11.7614 7 9 7C6.23858 7 4 9.23858 4 12C4 14.7614 6.23858 17 9 17Z"
      fill="#EB001A"
    />
    <path
      d="M15 17C17.7614 17 20 14.7614 20 12C20 9.23858 17.7614 7 15 7C12.2386 7 10 9.23858 10 12C10 14.7614 12.2386 17 15 17Z"
      fill="#F79E1C"
    />
    <path
      d="M12 15.98C13.1046 15.98 14 14.1981 14 12C14 9.80191 13.1046 8.02002 12 8.02002C10.8954 8.02002 10 9.80191 10 12C10 14.1981 10.8954 15.98 12 15.98Z"
      fill="#FF5F00"
    />
  </svg>
);

export default Mastercard;
