/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/


import { styled, type Theme } from '../styles';
import type { Properties } from 'csstype';

export const StyledRoot = styled<
  'div',
  {
    $wrap?: boolean;
  }
>('div', ({ $wrap, $theme }) => {
  return {
    display: 'flex',
    columnGap: $theme.sizing.scale300,
    rowGap: $theme.sizing.scale300,
    ...getWrapStyles({ $wrap, $theme }),
  };
});
StyledRoot.displayName = 'StyledRoot';

type WrapStyles = {
  flexWrap?: Properties['flexWrap'];
  overflowX?: Properties['overflowX'];
  scrollbarWidth?: Properties['scrollbarWidth'];
  padding?: Properties['padding'];
};

const getWrapStyles = ({ $wrap, $theme }): WrapStyles => {
  if (typeof $wrap === 'boolean') {
    return $wrap
      ? {
          padding: 0,
          flexWrap: 'wrap',
        }
      : {
          overflowX: 'auto',
          scrollbarWidth: 'none',
          padding: `0 ${$theme.sizing.scale600}`,
        };
  }
  return {};
};
