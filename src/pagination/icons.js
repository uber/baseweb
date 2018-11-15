/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {LightTheme} from '../themes';

/**
 * Ideally the content of this file should be replaced with official icons when they are available
 */

type IconPropsT = {
  color: string,
};

export function ArrowLeft({
  color = LightTheme.colors.primary,
}: IconPropsT = {}) {
  return (
    <svg viewBox="0 0 6 10" fill="none" style={{width: '6px', height: '10px'}}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 5.00001C3.57629e-07 5.26523 0.105358 5.51958 0.292894 5.70712L4.29289 9.70711C4.68342 10.0976 5.31658 10.0976 5.70711 9.70711C6.09763 9.31658 6.09763 8.68342 5.70711 8.29289L2.41421 5.00001L5.70711 1.70711C6.09763 1.31658 6.09763 0.683416 5.70711 0.292892C5.31658 -0.0976315 4.68342 -0.0976306 4.29289 0.292894L0.292892 4.29291C0.105356 4.48044 -3.57627e-07 4.7348 0 5.00001Z"
        fill={color}
      />
    </svg>
  );
}

export function ArrowRight({
  color = LightTheme.colors.primary,
}: IconPropsT = {}) {
  return (
    <svg viewBox="0 0 6 10" fill="none" style={{width: '6px', height: '10px'}}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.292894 0.292892C-0.0976306 0.683416 -0.0976315 1.31658 0.292892 1.70711L3.58579 5.00001L0.292894 8.29289C-0.0976306 8.68342 -0.0976315 9.31658 0.292892 9.70711C0.683416 10.0976 1.31658 10.0976 1.70711 9.70711L5.70711 5.70712C5.89464 5.51958 6 5.26523 6 5.00001C6 4.7348 5.89464 4.48044 5.70711 4.29291L1.70711 0.292894C1.31658 -0.0976306 0.683419 -0.0976315 0.292894 0.292892Z"
        fill={color}
      />
    </svg>
  );
}

export function ArrowDown() {
  return (
    <img
      src={
        'data:image/svg+xml;utf8,<svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.29289 5.29289L0.853553 0.853553C0.538571 0.538571 0.761654 0 1.20711 0H10.7929C11.2383 0 11.4614 0.538571 11.1464 0.853554L6.70711 5.29289C6.31658 5.68342 5.68342 5.68342 5.29289 5.29289Z" transform="translate(12) scale(-1 1)" fill="%23666666"/></svg>'
      }
    />
  );
}
