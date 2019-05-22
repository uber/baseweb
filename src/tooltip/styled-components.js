/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {
  getBodyStyles,
  getArrowStyles,
  getInnerStyles,
} from '../popover/styled-components.js';
import {getEndPosition} from '../popover/utils.js';

/**
 * We want to reuse the default Popover styles and add our overrides
 * for Tooltip. Normally you could do something like
 * withStyleDeep(StyledPopoverBody, {...}), however this break the
 * ability to use $style properly–the style overrides passed in by
 * the customer will override the base styles but not the styles
 * specified here.
 *
 * We could create our own withStyleDeep that also takes the $style
 * prop into account
 */
export const Body = styled('div', props => ({
  ...getBodyStyles(props),
  // Tooltip
  backgroundColor: props.$theme.colors.tooltipBackground,
  borderTopLeftRadius: props.$theme.borders.radius200,
  borderTopRightRadius: props.$theme.borders.radius200,
  borderBottomRightRadius: props.$theme.borders.radius200,
  borderBottomLeftRadius: props.$theme.borders.radius200,
  boxShadow: props.$theme.lighting.shadow400,
  color: props.$theme.colors.tooltipText,
  // Reset transition property to opacity only, and static transform
  transitionProperty: 'opacity',
  transform: getEndPosition(props.$popoverOffset),
}));

export const Inner = styled('div', props => ({
  ...getInnerStyles(props),
  backgroundColor: props.$theme.colors.tooltipBackground,
  borderTopLeftRadius: props.$theme.borders.radius200,
  borderTopRightRadius: props.$theme.borders.radius200,
  borderBottomRightRadius: props.$theme.borders.radius200,
  borderBottomLeftRadius: props.$theme.borders.radius200,
  paddingTop: props.$theme.sizing.scale300,
  paddingBottom: props.$theme.sizing.scale300,
  paddingLeft: props.$theme.sizing.scale300,
  paddingRight: props.$theme.sizing.scale300,
  ...props.$theme.typography.font250,
  color: props.$theme.colors.tooltipText,
}));

export const Arrow = styled('div', props => ({
  ...getArrowStyles(props),
  backgroundColor: props.$theme.colors.tooltipBackground,
}));
