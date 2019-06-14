/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index.js';

export const Root = styled<{$aspectRatio: number}>('div', ({$aspectRatio}) => ({
  width: '100%',
  position: 'relative',
  '::before': {
    content: '""',
    width: '1px',
    marginLeft: '-1px',
    float: 'left',
    height: 0,
    paddingTop: `${100 / $aspectRatio}%`,
    pointerEvents: 'none',
  },
  '::after': {
    content: '""',
    display: 'table',
    clear: 'both',
  },
}));

export const Body = styled<{}>('div', () => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '100%',
}));
