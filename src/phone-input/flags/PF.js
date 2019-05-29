/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
// BASEUI-GENERATED-FLAG-COMPONENT
// DO NOT EDIT THIS FILE DIRECTLY

import * as React from 'react';

export default function FlagPF(props: {width: string}) {
  return (
    <svg viewBox="0 0 21 15" width={props.width}>
      <defs>
        <linearGradient id="PFa" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF" />
          <stop offset="100%" stopColor="#F0F0F0" />
        </linearGradient>
        <linearGradient id="PFb" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#E02639" />
          <stop offset="100%" stopColor="#CA1A2C" />
        </linearGradient>
        <linearGradient id="PFc" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#DC2235" />
          <stop offset="100%" stopColor="#CA1A2C" />
        </linearGradient>
        <circle id="PFd" cx="2.5" cy="2.5" r="2.5" />
        <linearGradient id="PFe" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#FFA135" />
          <stop offset="100%" stopColor="#FD9C2D" />
        </linearGradient>
        <linearGradient id="PFg" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#DF2034" />
          <stop offset="100%" stopColor="#CA1A2C" />
        </linearGradient>
        <linearGradient id="PFh" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#0B4BAD" />
          <stop offset="100%" stopColor="#08429A" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill="url(#PFa)" d="M0 0h21v15H0z" />
        <path fill="url(#PFb)" d="M0 0h21v4H0z" />
        <path fill="url(#PFc)" d="M0 11h21v4H0z" />
        <path fill="url(#PFa)" d="M0 4h21v7H0z" />
        <g transform="translate(8 5)">
          <mask id="PFf" fill="#fff">
            <use xlinkHref="#PFd" />
          </mask>
          <path fill="url(#PFe)" d="M0 0h5v2.5H0z" mask="url(#PFf)" />
          <path fill="#FFF" d="M1 1.5h3l-.5 1h-2z" mask="url(#PFf)" />
          <path
            fill="url(#PFg)"
            d="M2 0h1v1.495A.508.508 0 0 1 2.5 2a.495.495 0 0 1-.5-.505V0zM1 1s.75 1.5 1.5 1.5S4 1 4 1v1c0 .552-.443 1-.999 1H1.999A.997.997 0 0 1 1 2V1z"
            mask="url(#PFf)"
          />
          <path fill="url(#PFh)" d="M0 3h5v2H0z" mask="url(#PFf)" />
          <path fill="#FFF" d="M0 3.5h5V4H0z" mask="url(#PFf)" />
        </g>
      </g>
    </svg>
  );
}
