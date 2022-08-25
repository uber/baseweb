/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import { getBodyStyles, getArrowStyles, getInnerStyles } from '../popover/styled-components';
import { getEndPosition } from '../popover/utils';
import type { SharedStylePropsArg } from '../popover';

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
export const Body = styled<'div', SharedStylePropsArg>('div', (props) => ({
  ...getBodyStyles(props),
  backgroundColor: props.$theme.colors.tooltipBackground,
  borderTopLeftRadius: props.$theme.borders.radius300,
  borderTopRightRadius: props.$theme.borders.radius300,
  borderBottomRightRadius: props.$theme.borders.radius300,
  borderBottomLeftRadius: props.$theme.borders.radius300,
  boxShadow: props.$theme.lighting.shadow400,
  color: props.$theme.colors.tooltipText,
  // Reset transition property to opacity only, and static transform
  transitionProperty: 'opacity',
  transform: getEndPosition(props.$popoverOffset),
}));

Body.displayName = 'Body';

export const Inner = styled<'div', SharedStylePropsArg>('div', (props) => ({
  ...getInnerStyles(props),
  backgroundColor: props.$theme.colors.tooltipBackground,
  borderTopLeftRadius: props.$theme.borders.radius300,
  borderTopRightRadius: props.$theme.borders.radius300,
  borderBottomRightRadius: props.$theme.borders.radius300,
  borderBottomLeftRadius: props.$theme.borders.radius300,
  paddingTop: props.$theme.sizing.scale300,
  paddingBottom: props.$theme.sizing.scale300,
  paddingLeft: props.$theme.sizing.scale600,
  paddingRight: props.$theme.sizing.scale600,
  ...props.$theme.typography.font150,
  color: props.$theme.colors.tooltipText,
}));

Inner.displayName = 'Inner';

export const Arrow = styled<'div', SharedStylePropsArg>('div', (props) => ({
  ...getArrowStyles(props),
  backgroundColor: props.$theme.colors.tooltipBackground,
}));
Arrow.displayName = 'Arrow';
