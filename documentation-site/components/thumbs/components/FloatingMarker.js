/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* THIS FILE IS AUTO-GENERATED. DO NOT MODIFY. */

import React from 'react';

export default function SvgFloatingMarker(props) {
  return (
    <svg width={232} height={145} fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M146 82.579a3.579 3.579 0 117.158 0 3.579 3.579 0 11-7.158 0z"
        fill={props.colors[1]}
      />
      <path fill={props.colors[1]} d="M78 58h68v21H78z" />
      <g clipPath="url(#floating-marker_svg__clip0)">
        <path
          d="M90.951 63.761c-1.158 0-2 .632-2.633 1.316-.631-.631-1.474-1.316-2.632-1.316-1.843 0-3.16 1.527-3.16 3.423 0 .947.37 1.79 1.054 2.37l4.738 4.475 4.74-4.476c.631-.632 1.052-1.422 1.052-2.37 0-1.895-1.316-3.422-3.159-3.422z"
          fill={props.colors[2]}
        />
      </g>
      <path fill={props.colors[2]} d="M98.637 65.5h43v6h-43z" />
      <defs>
        <clipPath id="floating-marker_svg__clip0">
          <path fill="#fff" transform="translate(82 62.181)" d="M0 0h12.637v12.637H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
