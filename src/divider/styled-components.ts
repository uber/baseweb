/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import { SIZE } from './constants';
import type { DividerProps } from './types';

export const StyledDivider = styled<'hr', DividerProps>('hr', (props) => {
  const { $theme, $size = SIZE.section } = props;
  if ($size === SIZE.cell) {
    return {
      borderTopWidth: '1px',
      borderTopColor: $theme.colors.borderOpaque,
      borderTopStyle: 'solid',
      // base styles
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightStyle: 'none',
      borderBottomStyle: 'none',
      borderLeftStyle: 'none',
    };
  }
  if ($size === SIZE.module) {
    return {
      borderTopWidth: '8px',
      borderTopColor: $theme.colors.backgroundTertiary,
      borderTopStyle: 'solid',
      // base styles
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightStyle: 'none',
      borderBottomStyle: 'none',
      borderLeftStyle: 'none',
    };
  }
  return {
    borderTopWidth: '2px',
    borderTopColor: $theme.colors.borderOpaque,
    borderTopStyle: 'solid',
    // base styles
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightStyle: 'none',
    borderBottomStyle: 'none',
    borderLeftStyle: 'none',
  };
});
