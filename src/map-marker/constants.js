/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export const NEEDLE_SIZES = Object.freeze({
  none: 'none',
  short: 'short',
  medium: 'medium',
  tall: 'tall',
});

export const NEEDLE_HEIGHTS = Object.freeze({
  [NEEDLE_SIZES.none]: 0,
  [NEEDLE_SIZES.short]: 4,
  [NEEDLE_SIZES.medium]: 12,
  [NEEDLE_SIZES.tall]: 20,
});

export const PINHEAD_SIZES_SHAPES = Object.freeze({
  xxSmallCircle: 'xx-small-circle',
  xxSmallSquare: 'xx-small-square',
  xSmallCircle: 'x-small-circle',
  xSmallSquare: 'x-small-square',
  small: 'small',
  medium: 'medium',
  large: 'large',
});

export const xSmallPinheadDimension = {
  height: 16,
  icon: 4,
};

export const xxSmallPinheadDimension = {
  height: 8,
  icon: 4,
};
export const PINHEAD_DIMENSIONS = Object.freeze({
  [PINHEAD_SIZES_SHAPES.xxSmallSquare]: xxSmallPinheadDimension,
  [PINHEAD_SIZES_SHAPES.xxSmallCircle]: xxSmallPinheadDimension,
  [PINHEAD_SIZES_SHAPES.xSmallSquare]: xSmallPinheadDimension,
  [PINHEAD_SIZES_SHAPES.xSmallCircle]: xSmallPinheadDimension,
  [PINHEAD_SIZES_SHAPES.small]: {height: 24, icon: 16},
  [PINHEAD_SIZES_SHAPES.medium]: {height: 36, icon: 16},
  [PINHEAD_SIZES_SHAPES.large]: {height: 48, icon: 24},
});

export const PINHEAD_TYPES = Object.freeze({
  floating: 'floating',
  fixed: 'fixed',
});

export const FLOATING_MARKER_SIZES = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large',
});

export const FLOATING_MARKER_ANCHOR_POSITIONS = Object.freeze({
  none: 'none',
  topLeft: 'top-left',
  topRight: 'top-right',
  bottomRight: 'bottom-right',
  bottomLeft: 'bottom-left',
});

export const FLOATING_MARKER_ANCHOR_TYPES = Object.freeze({
  circle: 'circle',
  square: 'square',
  xxSmallCircle: 'xx-small-circle',
  xxSmallSquare: 'xx-small-square',
});

export const dragShadowHeight = 4;
export const dragShadowMarginTop = 6;
export const dragShadowWidth = 6;
export const anchorSize = 16;

export const LABEL_ENHANCER_POSITIONS = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
};

export const BADGE_ENHANCER_SIZES = Object.freeze({
  xSmall: 'x-small',
  small: 'small',
  medium: 'medium',
});

const xSmallPinheadBadge = {
  [BADGE_ENHANCER_SIZES.xSmall]: {
    x: -5,
    y: -3,
  },
  [BADGE_ENHANCER_SIZES.small]: null,
  [BADGE_ENHANCER_SIZES.medium]: null,
};
export const BADGE_ENHANCER_POSITIONS = {
  //First level is fixed marker size
  [PINHEAD_SIZES_SHAPES.xxSmallSquare]: null,
  [PINHEAD_SIZES_SHAPES.xxSmallCircle]: null,
  [PINHEAD_SIZES_SHAPES.xSmallSquare]: xSmallPinheadBadge,
  [PINHEAD_SIZES_SHAPES.xSmallCircle]: xSmallPinheadBadge,
  [PINHEAD_SIZES_SHAPES.small]: {
    [BADGE_ENHANCER_SIZES.xSmall]: {
      x: -7,
      y: -1,
    },
    [BADGE_ENHANCER_SIZES.small]: {
      x: -8,
      y: -8,
    },
    [BADGE_ENHANCER_SIZES.medium]: null,
  },
  [PINHEAD_SIZES_SHAPES.medium]: {
    [BADGE_ENHANCER_SIZES.xSmall]: {
      x: -9,
      y: 1,
    },
    [BADGE_ENHANCER_SIZES.small]: {
      x: -10,
      y: -4,
    },
    [BADGE_ENHANCER_SIZES.medium]: {
      x: -12,
      y: -8,
    },
  },
  [PINHEAD_SIZES_SHAPES.large]: {
    [BADGE_ENHANCER_SIZES.xSmall]: {
      x: -11,
      y: 3,
    },
    [BADGE_ENHANCER_SIZES.small]: null,
    [BADGE_ENHANCER_SIZES.medium]: {
      x: -14,
      y: -6,
    },
  },
};

export const BADGE_ENHANCER_STYLES = {
  [BADGE_ENHANCER_SIZES.xSmall]: {
    height: '8px',
    width: '8px',
    borderRadius: '50%',
  },
  [BADGE_ENHANCER_SIZES.small]: {
    height: '16px',
    width: '16px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
  },
  [BADGE_ENHANCER_SIZES.medium]: {
    borderRadius: '10px',
    height: '20px',
    padding: '0px 8px',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
};
