/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index.js';

export const StyledRoot = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

export const StyledRow = styled('div', {
  backgroundColor: '#eee',
  height: '100px',
  width: '20px',
  marginRight: '10px',
  marginLeft: '10px',
  marginTop: '10px',
  marginBottom: '10px',
});

export const StyledAnimationRow = styled('div', {
  backgroundColor: '#eee',
  height: '100px',
  width: '20px',
  marginRight: '10px',
  marginLeft: '10px',
  marginTop: '10px',
  marginBottom: '10px',
  animationTimingFunction: 'ease-in-out',
  animationDuration: '2s',
  animationIterationCount: 'infinite',
  animationName: {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.4,
    },
    '100%': {
      opacity: 1,
    },
  },
});
