/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

const Amex = ({size}: {size: string}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23 4H1V20H23V4Z" fill="#1071CC" />
    <g clipPath="url(#clip0)">
      <path
        d="M20.4052 6H23.0031V11.6554V13.3873L21.6423 14.8365L23.0031 16.268V18H20.8647L19.7689 16.7982L18.6909 18H11.657V12.3446H9.3772L12.1872 6H14.9089L15.8809 8.15611V6H19.2388L19.822 7.64359L20.4052 6Z"
        fill="#fff"
      />
      <path
        d="M11.9926 11.6554H10.5081L12.6995 6.70691H14.4315L16.6053 11.5847V6.70691H18.7084L19.8218 9.76435L20.9175 6.70691H23.0029V11.6554H21.6598V8.24446L20.3873 11.6554H19.1855L17.9484 8.24446V11.6554H15.103L14.6612 10.6833H12.3991L11.9926 11.6554Z"
        fill="#1071CC"
      />
      <path
        d="M14.2018 9.55227L13.5302 7.97937L12.8586 9.55227H14.2018Z"
        fill="#fff"
      />
      <path
        d="M12.3992 17.3108V12.3623H18.3903L19.8042 13.9529L21.2534 12.3623H23.003L20.6702 14.8365L23.003 17.3108H21.2357L19.7688 15.7379L18.3373 17.3108H12.3992Z"
        fill="#1071CC"
      />
      <path
        d="M13.7422 14.271V13.5288H16.6052L16.6229 12.3977L18.9381 14.8366L16.6052 17.2755V16.1444H13.7422V15.4021H16.5345V14.271H13.7422Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="14" height="14" fill="#fff" transform="translate(9 5)" />
      </clipPath>
    </defs>
  </svg>
);

export default Amex;
