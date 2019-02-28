/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index.js';

export const StyledContent = styled('div', {
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 'auto',
});

export const StyledHeader = styled('div');

export const StyledLayout = styled('div', props => {
  return {
    display: 'flex',
    flexDirection: props.$isRow ? 'row' : 'column',
    width: '100%',
  };
});

export const StyledSidebar = styled('div');
