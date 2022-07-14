/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles/index';
import { SIZE } from './constants';
import type { DividerProps } from './types';

export const StyledDivider = styled<'hr', DividerProps>('hr', (props) => {
  const { $theme, $size = SIZE.section } = props;
  const borderResetStyles = {
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  };

  if ($size === SIZE.cell) {
    return {
      ...borderResetStyles,
      borderTopWidth: '1px',
      borderTopColor: $theme.colors.borderOpaque,
      borderTopStyle: 'solid',
    };
  }
  if ($size === SIZE.module) {
    return {
      ...borderResetStyles,
      borderTopWidth: '8px',
      borderTopColor: $theme.colors.backgroundTertiary,
      borderTopStyle: 'solid',
    };
  }
  return {
    ...borderResetStyles,
    borderTopWidth: '2px',
    borderTopColor: $theme.colors.borderOpaque,
    borderTopStyle: 'solid',
  };
});
