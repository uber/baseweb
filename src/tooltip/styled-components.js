/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
import {styled} from '../styles';
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
