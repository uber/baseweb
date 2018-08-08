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
/* eslint-disable import/prefer-default-export */
import {ARROW_SIZE, POPOVER_MARGIN, PLACEMENT} from './constants';
import type {OffsetT, PopoverPlacementT, PopperOffsetT} from './types';

const OPPOSITE_POSITIONS = {
  top: 'bottom',
  bottom: 'top',
  right: 'left',
  left: 'right',
};

/**
 * Returns the opposite of the specified position. Useful for tooltip
 * positioning logic.
 * Examples:
 * top -> bottom
 * left -> right
 */
export function getOppositePosition(position: string): string {
  return OPPOSITE_POSITIONS[position];
}

/**
 * Determines whether or not the specified position is a vertical one (top or bottom)
 */
export function isVerticalPosition(position: string): boolean {
  return position === 'top' || position === 'bottom';
}

/**
 * Simple utility function for capitalizing the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts our placement prop to a Popper.js placement
 * See docs: https://popper.js.org/popper-documentation.html
 * auto, top, right, bottom, left are the same but things
 * like 'rightTop' must be converted to 'right-start'
 */
export function toPopperPlacement(placement: PopoverPlacementT): string {
  return placement
    .replace(/(Top|Left)$/, '-start')
    .replace(/(Right|Bottom)$/, '-end');
}

/**
 * Opposite of function above, converts from Popper.js placement
 * to our placement prop
 */
export function fromPopperPlacement(
  placement: string,
): PopoverPlacementT | null {
  const popoverPlacement: string = placement
    .replace(/(top|bottom)-start$/, '$1Left')
    .replace(/(top|bottom)-end$/, '$1Right')
    .replace(/(left|right)-start$/, '$1Top')
    .replace(/(left|right)-end$/, '$1Bottom');
  return PLACEMENT[popoverPlacement] || null;
}

/**
 * Splits something like 'topLeft' to ['top', 'left'] for easier usage
 */
export function splitPlacement(placement: PopoverPlacementT) {
  const matches = placement.match(/^([a-z]+)([A-Z][a-z]+)?/) || [];
  return matches
    .slice(1, 3)
    .filter(Boolean)
    .map(s => s.toLowerCase());
}

/**
 * Takes the offset passed from popper.js and normalizes it
 */
export function parsePopperOffset(offset: PopperOffsetT): OffsetT {
  return {
    top: Math.floor(offset.top || 0),
    left: Math.floor(offset.left || 0),
  };
}

/**
 * Returns margin styles to add spacing between the popover
 * and its anchor.
 *
 * We may eventually want to make margin a prop that can be overridden.
 */
export function getPopoverMarginStyles(
  showArrow: boolean,
  placement: PopoverPlacementT,
) {
  const [position] = splitPlacement(placement);
  const opposite = getOppositePosition(position);
  if (!opposite) {
    return null;
  }
  const property = `margin${capitalize(opposite)}`;
  return {
    [property]: `${showArrow ? ARROW_SIZE : POPOVER_MARGIN}px`,
  };
}

/**
 * Returns CSS rules for the popover animation start keyframe
 */
export function getStartPosition(
  offset: OffsetT,
  placement: PopoverPlacementT,
  showArrow: boolean,
) {
  offset = {...offset};
  const [position] = splitPlacement(placement);
  const margin = (showArrow ? ARROW_SIZE : POPOVER_MARGIN) * 2;
  if (isVerticalPosition(position)) {
    offset.top += position === 'top' ? margin : -margin;
  } else {
    offset.left += position === 'left' ? margin : -margin;
  }
  return `translate3d(${offset.left}px, ${offset.top}px, 0)`;
}

/**
 * Returns CSS rules for the popover animation end keyframe
 */
export function getEndPosition(offset: OffsetT) {
  return `translate3d(${offset.left}px, ${offset.top}px, 0)`;
}

/**
 * Returns top/left styles to position the popover arrow
 */
export function getArrowPositionStyles(
  offsets: OffsetT,
  placement: PopoverPlacementT,
) {
  const [position] = splitPlacement(placement);
  const oppositePosition = getOppositePosition(position);
  if (!oppositePosition) {
    return null;
  }

  const alignmentProperty = isVerticalPosition(position) ? 'left' : 'top';
  return {
    [alignmentProperty]: `${offsets[alignmentProperty]}px`,
    [oppositePosition]: `-${ARROW_SIZE - 2}px`,
  };
}
