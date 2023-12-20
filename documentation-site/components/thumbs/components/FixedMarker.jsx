/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* THIS FILE IS AUTO-GENERATED. DO NOT MODIFY. */

import React from "react";

export default function SvgFixedMarker(props) {
  return (
    <svg width={232} height={145} fill="none" {...props}>
      <rect
        x={80}
        y={55}
        width={72.486}
        height={25.274}
        rx={12.637}
        fill={props.colors[1]}
      />
      <path fill={props.colors[2]} d="M86.318 64.637h43v6h-43z" />
      <g clipPath="url(#fixed-marker_svg__clip0)">
        <path
          d="M142.482 62.898c-1.159 0-2.001.632-2.633 1.316-.632-.631-1.474-1.316-2.633-1.316-1.842 0-3.159 1.527-3.159 3.422 0 .948.369 1.79 1.053 2.37l4.739 4.475 4.739-4.475c.632-.632 1.053-1.422 1.053-2.37 0-1.895-1.316-3.422-3.159-3.422z"
          fill={props.colors[2]}
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M115.19 79.747h2.106v11.584h-2.106V79.747z"
        fill={props.colors[1]}
      />
      <defs>
        <clipPath id="fixed-marker_svg__clip0">
          <path
            fill="#fff"
            transform="translate(133.531 61.318)"
            d="M0 0h12.637v12.637H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
