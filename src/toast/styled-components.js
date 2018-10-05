/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles';
import {getSvgStyles} from '../icon/styled-components';
import {KIND} from './constants';
import type {SharedStylePropsT, KindTypeT} from './types';

function getBackgroundColor(kind: KindTypeT, theme) {
  return {
    [KIND.info]: theme.colors.primary500,
    [KIND.positive]: theme.colors.positive500,
    [KIND.warning]: theme.colors.warning500,
    [KIND.negative]: theme.colors.negative500,
  }[kind];
}

export const Body = styled('div', (props: SharedStylePropsT) => {
  const {$isHidden, $isAnimating, $kind, $theme} = props;
  return {
    ...$theme.typography.font300,
    color: $theme.colors.white,
    height: $isHidden && !$isAnimating ? 0 : 'auto',
    width: '288px',
    paddingTop: $theme.sizing.scale600,
    paddingRight: $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale600,
    paddingLeft: $theme.sizing.scale600,
    marginTop: $theme.sizing.scale600,
    marginBottom: $theme.sizing.scale600,
    backgroundColor:
      getBackgroundColor($kind, $theme) || $theme.colors.primary500,
    borderRadius: $theme.borders.useRoundedCorners
      ? $theme.borders.radius200
      : '0px',
    boxShadow: $theme.lighting.shadow600,
    opacity: $isHidden ? 0 : 1,
    transitionProperty: 'opacity, height',
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeInOutCurve,
  };
});

/**
 * DeleteAlt icon overrides
 */
export const CloseIconSvg = styled('svg', props => {
  return {
    ...getSvgStyles(props),
    cursor: 'pointer',
    float: 'right',
  };
});
