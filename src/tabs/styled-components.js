/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import type {SharedStylePropsT} from './types.js';
import {ORIENTATION} from './constants.js';

/**
 * Main component container element
 */
export const Root = styled('div', (props: SharedStylePropsT) => {
  const {$orientation} = props;
  return {
    display: 'flex',
    flexDirection: $orientation === ORIENTATION.vertical ? 'row' : 'column',
  };
});

export const Tab = styled('div', (props: SharedStylePropsT) => {
  const {
    $disabled,
    $active,
    $orientation,
    $theme: {colors, sizing, typography},
  } = props;
  let style = {
    ...typography.font300,
    boxSizing: 'border-box',
    color: $active ? colors.colorPrimary : colors.tabColor,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    paddingTop: sizing.scale600,
    paddingBottom: sizing.scale600,
    paddingLeft: sizing.scale300,
    paddingRight: sizing.scale300,
    marginLeft: sizing.scale200,
    marginRight: sizing.scale200,
    borderBottom:
      $orientation === ORIENTATION.horizontal && $active
        ? `2px solid ${colors.primary400}`
        : 'none',
    display: 'inline-block',
  };
  if (!$disabled) {
    style = {
      ...style,
      ':focus': {
        color: colors.primary400,
      },
      ':hover': {
        color: colors.primary400,
      },
    };
  }
  return style;
});

export const TabBar = styled('div', (props: SharedStylePropsT) => {
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

export const TabContent = styled('div', (props: SharedStylePropsT) => {
  const {
    $active,
    $theme: {sizing, typography},
  } = props;
  return {
    ...typography.font400,
    display: $active ? 'block' : 'none',
    paddingLeft: sizing.scale800,
    paddingRight: sizing.scale800,
    paddingTop: sizing.scale500,
    paddingBottom: sizing.scale500,
  };
});
