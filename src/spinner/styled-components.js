/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {getSvgStyles} from '../icon/styled-components.js';

const spin = {
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
};

/**
 * Spinner icon overrides
 */
export const Svg = styled('svg', props => {
  const {$theme, $color} = props;
  return {
    ...getSvgStyles(props),
    fill: $color || $theme.colors.primary400,
    cursor: 'wait',
    animationName: spin,
    animationDuration: $theme.animation.timing700,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  };
});
Svg.displayName = 'StyledSvg';
