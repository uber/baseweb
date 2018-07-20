// @flow
import {styled} from '../../styles';
import {ARROW_SIZE} from './constants';
import {getTransformOrigin, getPopoverMarginStyles} from './utils';

/**
 * Since we use a 45-degree rotated div to render the arrow, the
 * width/height of this div is different than the arrow size itself
 *
 * The arrow size is essentially half the diagonal of the rotated div,
 * using pythagorean theorem:
 *   width^2 + height^2 = (arrow_size * 2)^2
 * In this case width = height so:
 *   2 * width^2 = (arrow_size * 2)^2
 * Simplifies to:
 *   width = √((arrow_size * 2)^2 / 2)
 */
const ARROW_WIDTH = Math.floor(Math.sqrt((ARROW_SIZE * 2) ** 2 / 2));

const ANIMATION_START_KEYFRAME = {
  opacity: 0,
  transform: 'scale(0.8)',
};

const ANIMATION_END_KEYFRAME = {
  opacity: 1,
  transform: 'scale(1)',
};

/**
 * Main popover container element that gets positioned next to the anchor
 */
export const Body = styled('div', props => {
  const {
    $isOpen,
    $isAnimating,
    $placement,
    $arrowStyles,
    $positionStyles,
    $showArrow,
    $theme,
  } = props;

  return {
    position: 'absolute',
    zIndex: 1050,
    backgroundColor: $theme.colors.background,
    borderRadius: $theme.borders.useRoundedCorners
      ? $theme.borders.radius300
      : '0px',
    boxShadow: $theme.lighting.shadow600,

    // Animation-related styles
    transformOrigin: getTransformOrigin(
      $placement,
      $showArrow ? $arrowStyles : undefined,
    ),
    animationDuration: '0.2s',
    animationFillMode: 'both',
    animationPlayState: $isAnimating ? 'running' : 'paused',
    animationTimingFunction: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
    animationName: {
      from: $isOpen ? ANIMATION_START_KEYFRAME : ANIMATION_END_KEYFRAME,
      to: $isOpen ? ANIMATION_END_KEYFRAME : ANIMATION_START_KEYFRAME,
    },

    ...getPopoverMarginStyles($showArrow, $placement),
    ...$positionStyles,
  };
});

/**
 * Arrow shown between the popover and the anchor element
 */
export const Arrow = styled('div', props => {
  return {
    backgroundColor: props.$theme.colors.background,
    boxShadow: props.$theme.lighting.shadow600,
    width: `${ARROW_WIDTH}px`,
    height: `${ARROW_WIDTH}px`,
    transform: 'rotate(45deg)',
    position: 'absolute',
    zIndex: 1, // Below PopoverInner
    ...props.$arrowStyles,
  };
});

/**
 * Extra div that holds the popover content. This extra element
 * is needed for the arrow–the arrow is just a 45deg rotated div,
 * and rendering this extra element on top with a solid background
 * clips the part of the arrow that extends into the popover.
 */
export const Inner = styled('div', ({$theme}) => ({
  backgroundColor: $theme.colors.background,
  borderRadius: $theme.borders.useRoundedCorners
    ? $theme.borders.radius300
    : '0px',
  position: 'relative',
  zIndex: 2, // Above PopoverArrow
}));

/**
 * A drop-in component that provides the recommended padding
 * for popovers. Mostly a convenience for users so they don't
 * have to define this themselves.
 */
export const Padding = styled('div', {
  padding: '12px',
});
