/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles';
import {getSvgStyles} from '../icon/styled-components';
import type {SharedStylePropsT} from './types';

/**
 * Main component container element
 */
export const Root = styled('div', (props: SharedStylePropsT) => {
  return {};
});

export const PanelContainer = styled('div', (props: SharedStylePropsT) => {
  return {width: '100%'};
});

export const Header = styled('h3', (props: SharedStylePropsT) => {
  const {
    $disabled,
    $expanded,
    $theme: {colors, sizing, typography},
  } = props;
  return {
    ...typography.font450,
    color: colors.black,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    backgroudColor: colors.white,
    paddingTop: sizing.scale600,
    paddingBottom: sizing.scale600,
    paddingLeft: sizing.scale700,
    paddingRight: sizing.scale1200,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderBottom: `1px solid ${$expanded ? colors.mono500 : colors.mono400}`,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    ':focus': {
      backgroudColor: colors.mono400,
    },
  };
});

export const ToggleIcon = styled('svg', props => {
  const {$theme, $disabled, $color} = props;
  return {
    ...getSvgStyles(props),
    color: $color || $theme.colors.mono600,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    position: 'absolute',
    right: '12px',
  };
});

export const Content = styled('div', (props: SharedStylePropsT) => {
  const {
    $theme: {animation, colors, sizing, typography},
    $expanded,
  } = props;
  return {
    ...typography.font300,
    backgroundColor: colors.mono200,
    paddingTop: $expanded ? sizing.scale800 : 0,
    paddingBottom: $expanded ? sizing.scale1000 : 0,
    paddingLeft: sizing.scale800,
    paddingRight: sizing.scale800,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderBottom: $expanded ? `1px solid ${colors.mono500}` : 'none',
    boxSizing: 'border-box',
    height: $expanded ? 'auto' : '0',
    maxHeight: $expanded ? '100%' : '0',
    overflow: 'hidden',
    opacity: $expanded ? 1 : 0,
    transitionProperty: 'all',
    transitionDuration: animation.timing400,
    transitionTimingFunction: animation.easeInOutCurve,
  };
});
