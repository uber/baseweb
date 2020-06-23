/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {ORIENTATION, TAB_WIDTH} from './constants.js';
import type {SharedStylePropsArgT} from './types.js';

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const Root = styled<SharedStylePropsArgT>('div', props => {
  const {$orientation} = props;
  return {
    display: 'flex',
    flexDirection: $orientation === ORIENTATION.vertical ? 'row' : 'column',
  };
});

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const Tab = styled<SharedStylePropsArgT>('div', props => {
  const {
    $disabled,
    $active,
    $orientation,
    $tabWidth,
    $isFocusVisible,
    $theme: {colors, sizing, typography},
  } = props;
  let style = {
    ...typography.LabelSmall,
    boxSizing: 'border-box',
    color: $active ? colors.contentPrimary : colors.tabColor,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    paddingTop: sizing.scale600,
    paddingBottom: sizing.scale600,
    paddingLeft: sizing.scale600,
    paddingRight: sizing.scale600,
    scrollSnapAlign: 'start',
    outline: $isFocusVisible ? `3px solid ${colors.accent}` : 'none',
    outlineOffset: '-3px',
    boxShadow:
      $orientation === ORIENTATION.vertical && $active && !$isFocusVisible
        ? `inset -5px 0 ${colors.primary}`
        : null,
    borderBottom:
      $orientation === ORIENTATION.horizontal
        ? $active && !$isFocusVisible
          ? `5px solid ${colors.primary}`
          : '5px solid transparent'
        : null,
    display: 'inline-block',
    flexShrink: $tabWidth === TAB_WIDTH.intrinsic ? '0' : null,
    ...($tabWidth === TAB_WIDTH.fixed && $orientation === ORIENTATION.horizontal
      ? {
          flexGrow: '1',
          textAlign: 'center',
        }
      : {}),
  };
  if (!$disabled) {
    style = {
      ...style,
      ':focus': {
        color: colors.primary,
      },
      ':hover': {
        color: colors.primary,
      },
    };
  }
  return style;
});

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const TabBar = styled<SharedStylePropsArgT>('div', props => {
  const {
    $orientation,
    $tabWidth,
    $theme: {colors},
  } = props;
  return {
    display: 'flex',
    flexDirection: $orientation === ORIENTATION.vertical ? 'column' : 'row',
    boxShadow:
      $orientation === ORIENTATION.vertical
        ? `inset -5px 0px ${colors.borderOpaque}`
        : `inset 0 -5px ${colors.borderOpaque}`,
    ...($tabWidth === TAB_WIDTH.intrinsic
      ? {
          overflowY: $orientation === ORIENTATION.vertical ? 'scroll' : null,
          overflowX: $orientation === ORIENTATION.horizontal ? 'scroll' : null,
          scrollSnapType: `${
            $orientation === ORIENTATION.vertical ? 'y' : 'x'
          } mandatory`,
          // The following properties hide the scroll bar on various browsers:
          // Chrome, Safari, etc
          '::-webkit-scrollbar': {
            display: 'none',
          },
          // IE, Edge
          '-ms-overflow-style': 'none',
          // Firefox
          scrollbarWidth: 'none',
        }
      : {}),
  };
});

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const TabContent = styled<SharedStylePropsArgT>('div', props => {
  const {
    $active,
    $theme: {sizing, typography},
  } = props;
  return {
    ...typography.font300,
    display: $active ? 'block' : 'none',
    paddingLeft: sizing.scale600,
    paddingRight: sizing.scale600,
    paddingTop: sizing.scale500,
    paddingBottom: sizing.scale500,
  };
});
