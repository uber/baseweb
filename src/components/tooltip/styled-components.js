// @flow
import {styled} from '../../styles';
import {
  getBodyStyles,
  getArrowStyles,
  getInnerStyles,
} from '../popover/styled-components';
import {getEndPosition} from '../popover/utils';

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
  backgroundColor: props.$theme.tooltip.backgroundColor,
  borderRadius: props.$theme.borders.radius200,
  boxShadow: props.$theme.lighting.shadow400,
  color: props.$theme.colors.mono100,
  // Reset transition property to opacity only, and static transform
  transitionProperty: 'opacity',
  transform: getEndPosition(props.$popoverOffset),
}));

export const Inner = styled('div', props => ({
  ...getInnerStyles(props),
  backgroundColor: props.$theme.tooltip.backgroundColor,
  borderRadius: props.$theme.borders.radius200,
  paddingTop: props.$theme.sizing.scale300,
  paddingBottom: props.$theme.sizing.scale300,
  paddingLeft: props.$theme.sizing.scale300,
  paddingRight: props.$theme.sizing.scale300,
  ...props.$theme.typography.font200,
}));

export const Arrow = styled('div', props => ({
  ...getArrowStyles(props),
  backgroundColor: props.$theme.tooltip.backgroundColor,
}));
