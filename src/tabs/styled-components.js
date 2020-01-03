/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {ORIENTATION} from './constants.js';
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
    $theme: {colors, sizing, typography},
  } = props;
  let style = {
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
    borderBottom:
      $orientation === ORIENTATION.horizontal && $active
        ? `2px solid ${colors.primary}`
        : 'none',
    display: 'inline-block',
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
    $theme: {colors, sizing},
  } = props;
  return {
    display: 'flex',
    flexDirection: $orientation === ORIENTATION.vertical ? 'column' : 'row',
    paddingLeft: sizing.scale400,
    paddingRight: sizing.scale400,
    backgroundColor: colors.tabBarFill,
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
    paddingLeft: sizing.scale800,
    paddingRight: sizing.scale800,
    paddingTop: sizing.scale500,
    paddingBottom: sizing.scale500,
  };
});
