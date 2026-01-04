/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import { SIZE } from '../button';
import { PADDING } from './constants';
import type { Properties } from 'csstype';

export const StyledRoot = styled<
  'div',
  {
    $padding: (typeof PADDING)[keyof typeof PADDING];
    $wrap?: boolean;
    $size: (typeof SIZE)[keyof typeof SIZE];
  }
>('div', ({ $padding, $wrap, $size, $theme }) => {
  return {
    display: 'flex',
    columnGap: $theme.sizing.scale300,
    rowGap:
      $size === SIZE.xSmall || $size === SIZE.mini
        ? $theme.sizing.scale500
        : $theme.sizing.scale300,
    ...getWrapStyles({ $wrap }),
    ...getPaddingStyles({ $padding, $theme }),
  };
});
StyledRoot.displayName = 'StyledRoot';

type WrapStyles = {
  flexWrap?: Properties['flexWrap'];
  overflowX?: Properties['overflowX'];
  scrollbarWidth?: Properties['scrollbarWidth'];
};

const getWrapStyles = ({ $wrap }): WrapStyles => {
  if (typeof $wrap === 'boolean') {
    return $wrap
      ? {
          flexWrap: 'wrap',
        }
      : {
          overflowX: 'auto',
          scrollbarWidth: 'none',
        };
  }
  return {};
};

const getPaddingStyles = ({ $padding, $theme }) => {
  switch ($padding) {
    case PADDING.default:
      return {
        paddingLeft: $theme.sizing.scale600,
        paddingRight: $theme.sizing.scale600,
      };
    case PADDING.none:
      return {
        paddingLeft: 0,
        paddingRight: 0,
      };
    case PADDING.custom:
    default:
      return Object.freeze({});
  }
};
