/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
// BASEUI-GENERATED-FLAG-COMPONENT
// DO NOT EDIT THIS FILE DIRECTLY

import * as React from 'react';

export default function FlagPN(props: {width: string}) {
  return (
    <svg viewBox="0 0 21 15" width={props.width}>
      <defs>
        <linearGradient id="PNa" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF" />
          <stop offset="100%" stopColor="#F0F0F0" />
        </linearGradient>
        <linearGradient id="PNb" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#07319C" />
          <stop offset="100%" stopColor="#00247E" />
        </linearGradient>
        <linearGradient id="PNd" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#1F8BDE" />
          <stop offset="100%" stopColor="#1075C2" />
        </linearGradient>
        <path
          id="PNc"
          d="M0 3.5V.51C0 .228.215 0 .498 0h4.004C4.777 0 5 .227 5 .51V3.5C5 6 2.5 7 2.5 7S0 6 0 3.5z"
        />
        <linearGradient id="PNe" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#F7E14A" />
          <stop offset="100%" stopColor="#F7DE38" />
        </linearGradient>
        <linearGradient id="PNg" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#4B8C36" />
          <stop offset="100%" stopColor="#397127" />
        </linearGradient>
        <linearGradient id="PNh" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#DB1E36" />
          <stop offset="100%" stopColor="#D51931" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill="url(#PNa)" d="M0 0h21v15H0z" />
        <path fill="url(#PNb)" d="M0 0h21v15H0z" />
        <g transform="translate(13 6)">
          <mask id="PNf" fill="#fff">
            <use xlinkHref="#PNc" />
          </mask>
          <use fill="url(#PNd)" xlinkHref="#PNc" />
          <path
            fill="url(#PNe)"
            fillRule="nonzero"
            d="M-.5 6l3-6 3 6v2h-6z"
            mask="url(#PNf)"
          />
          <path
            fill="url(#PNg)"
            fillRule="nonzero"
            d="M0 6.118V7.5h5V6.118l-2.5-5z"
            mask="url(#PNf)"
          />
        </g>
        <path
          fill="url(#PNa)"
          fillRule="nonzero"
          d="M3 3.23L-1.352-.5H.66L4.16 2h.697L9.5-.902V.25c0 .303-.167.627-.418.806L6 3.257v.513l3.137 2.69c.462.395.204 1.04-.387 1.04-.245 0-.545-.096-.75-.242L4.84 5h-.697L-.5 7.902v-1.66l3.5-2.5V3.23z"
        />
        <path
          fill="url(#PNh)"
          d="M3.5 3L0 0h.5L4 2.5h1L9 0v.25a.537.537 0 0 1-.208.399L5.5 3v1l3.312 2.839c.104.089.072.161-.062.161a.898.898 0 0 1-.458-.149L5 4.5H4L0 7v-.5L3.5 4V3z"
        />
        <path
          fill="url(#PNa)"
          d="M0 2.5v2h3.5v2.505c0 .273.214.495.505.495h.99a.496.496 0 0 0 .505-.495V4.5h3.51a.49.49 0 0 0 .49-.505v-.99a.495.495 0 0 0-.49-.505H5.5V0h-2v2.5H0z"
        />
        <path fill="url(#PNh)" d="M0 3h4V0h1v3h4v1H5v3H4V4H0z" />
      </g>
    </svg>
  );
}
