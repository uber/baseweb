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
    outline: $isFocusVisible ? `5px solid ${colors.accent}` : 'none',
    outlineOffset: '-5px',
    flexShrink: $tabWidth === TAB_WIDTH.intrinsic ? '0' : null,
    flexGrow:
      $tabWidth === TAB_WIDTH.fixed && $orientation === ORIENTATION.horizontal
        ? '1'
        : null,
    textAlign:
      $tabWidth === TAB_WIDTH.fixed && $orientation === ORIENTATION.horizontal
        ? 'center'
        : null,
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
  const {$orientation, $tabWidth, $theme} = props;
  return {
    display: 'flex',
    position: 'relative',
    paddingBottom: $orientation === ORIENTATION.horizontal ? '5px' : null,
    paddingRight:
      $orientation === ORIENTATION.vertical && $theme.direction !== 'rtl'
        ? '5px'
        : null,
    paddingLeft:
      $orientation === ORIENTATION.vertical && $theme.direction === 'rtl'
        ? '5px'
        : null,
    flexDirection: $orientation === ORIENTATION.vertical ? 'column' : 'row',
    ...($tabWidth === TAB_WIDTH.intrinsic
      ? {
          overflowX: $orientation === ORIENTATION.horizontal ? 'scroll' : null,
          overflowY: $orientation === ORIENTATION.vertical ? 'scroll' : null,
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
export const TabDivider = styled<SharedStylePropsArgT>(
  'div',
  ({$theme, $orientation}) => {
    return {
      height: $orientation === ORIENTATION.horizontal ? '5px' : null,
      width: $orientation === ORIENTATION.vertical ? '5px' : null,
      marginTop: $orientation === ORIENTATION.horizontal ? '-5px' : null,
      marginLeft:
        $orientation === ORIENTATION.vertical && $theme.direction !== 'rtl'
          ? '-5px'
          : null,
      marginRight:
        $orientation === ORIENTATION.vertical && $theme.direction === 'rtl'
          ? '-5px'
          : null,
      backgroundColor: $theme.colors.borderOpaque,
    };
  },
);

export const TabHighlight = styled<
  // $FlowFixMe https://github.com/facebook/flow/issues/7745
  SharedStylePropsArgT & {$length: number, $distance: number},
>(
  'div',
  ({
    $theme,
    $orientation = ORIENTATION.horizontal,
    $length = 0,
    $distance = 0,
  }) => {
    return {
      bottom: $orientation === ORIENTATION.horizontal ? '0' : null,
      left:
        $orientation === ORIENTATION.vertical && $theme.direction === 'rtl'
          ? '0'
          : null,
      right:
        $orientation === ORIENTATION.vertical && $theme.direction !== 'rtl'
          ? '0'
          : null,
      position: 'absolute',
      backgroundColor: $theme.colors.primary,
      transition: `all ${$theme.animation.timing200} ${$theme.animation.easeInOutQuinticCurve}`,
      height: $orientation === ORIENTATION.horizontal ? '5px' : `${$length}px`,
      width: $orientation === ORIENTATION.vertical ? '5px' : `${$length}px`,
      transform: `translate${
        $orientation === ORIENTATION.horizontal ? 'X' : 'Y'
      }(${$distance}px)`,
    };
  },
);

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
