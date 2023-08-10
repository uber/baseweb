/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import { ORIENTATION } from './constants';
import type { SharedStylePropsArg } from './types';
import type { StyleObject } from 'styletron-standard';

export const Root = styled<'div', SharedStylePropsArg>('div', (props) => {
  const { $orientation } = props;
  return {
    display: 'flex',
    flexDirection: $orientation === ORIENTATION.vertical ? 'row' : 'column',
  };
});

Root.displayName = 'Root';

export const Tab = styled<'div', SharedStylePropsArg>('div', (props) => {
  const {
    $disabled,
    $active,
    $orientation,
    $isFocusVisible,
    $theme: { colors, sizing, typography },
  } = props;
  let style: StyleObject = {
    ...typography.font200,
    boxSizing: 'border-box',
    color: $active ? colors.contentPrimary : colors.tabColor,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    paddingTop: sizing.scale600,
    paddingBottom: sizing.scale600,
    paddingLeft: sizing.scale300,
    paddingRight: sizing.scale300,
    marginLeft: sizing.scale200,
    marginRight: sizing.scale200,
    outline: $isFocusVisible ? `3px solid ${colors.borderAccent}` : 'none',
    outlineOffset: '-3px',
    borderBottom:
      $orientation === ORIENTATION.horizontal && $active && !$isFocusVisible
        ? `2px solid ${colors.borderSelected}`
        : '2px solid transparent',
    display: 'inline-block',
  };
  if (!$disabled && !$active) {
    style = {
      ...style,
      ':focus': {
        color: colors.contentPrimary,
      },
      ':hover': {
        color: colors.contentPrimary,
      },
    };
  }
  return style;
});

Tab.displayName = 'Tab';

export const TabBar = styled<'div', SharedStylePropsArg>('div', (props) => {
  const {
    $orientation,
    $theme: { colors, sizing },
  } = props;
  return {
    display: 'flex',
    flexDirection: $orientation === ORIENTATION.vertical ? 'column' : 'row',
    paddingLeft: sizing.scale400,
    paddingRight: sizing.scale400,
    backgroundColor: colors.tabBarFill,
  };
});

TabBar.displayName = 'TabBar';

export const TabContent = styled<'div', SharedStylePropsArg>('div', (props) => {
  const {
    $active,
    $theme: { sizing, typography },
  } = props;
  return {
    ...typography.font300,
    display: $active ? 'block' : 'none',
    paddingLeft: sizing.scale800,
    paddingRight: sizing.scale800,
    paddingTop: sizing.scale500,
    paddingBottom: sizing.scale500,
  };
});
TabContent.displayName = 'TabContent';
