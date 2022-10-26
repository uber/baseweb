/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';

export const StyledRoot = styled<'div', {}>('div', ({ $theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  maxWidth: '139px',
  height: '48px',
  padding: $theme.sizing.scale550,
}));
StyledRoot.displayName = 'StyledRoot';
