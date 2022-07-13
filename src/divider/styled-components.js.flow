/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import { styled } from '../styles/index.js';
import { SIZE } from './constants.js';
import type { DividerPropsT } from './types.js';

export const StyledDivider = styled<DividerPropsT>('hr', ({ $theme, $size = SIZE.section }) => {
  const borderResetStyles = {
    borderRight: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
  };

  if ($size === SIZE.cell) {
    return {
      ...borderResetStyles,
      borderTop: `1px solid ${$theme.colors.borderOpaque}`,
    };
  }
  if ($size === SIZE.module) {
    return {
      ...borderResetStyles,
      borderTop: `8px solid ${$theme.colors.backgroundTertiary}`,
    };
  }
  return {
    ...borderResetStyles,
    borderTop: `2px solid ${$theme.colors.borderOpaque}`,
  };
});
