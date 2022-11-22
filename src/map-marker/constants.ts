/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export const NEEDLE_SIZES = Object.freeze({
  none: 'none',
  short: 'short',
  medium: 'medium',
  tall: 'tall',
} as const);

export const NEEDLE_HEIGHTS = Object.freeze({
  [NEEDLE_SIZES.none]: 0,
  [NEEDLE_SIZES.short]: 4,
  [NEEDLE_SIZES.medium]: 12,
  [NEEDLE_SIZES.tall]: 20,
} as const);

// Important: keep this sorted by size, as it used to determine label size when a secondary label is used.
export const PINHEAD_SIZES_SHAPES = Object.freeze({
  xxSmallCircle: 'xx-small-circle',
  xxSmallSquare: 'xx-small-square',
  xSmallCircle: 'x-small-circle',
  xSmallSquare: 'x-small-square',
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const);

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
  [PINHEAD_SIZES_SHAPES.small]: { height: 24, icon: 16 },
  [PINHEAD_SIZES_SHAPES.medium]: { height: 36, icon: 16 },
  [PINHEAD_SIZES_SHAPES.large]: { height: 48, icon: 24 },
});

export const PINHEAD_TYPES = Object.freeze({
  floating: 'floating',
  fixed: 'fixed',
} as const);

export const FLOATING_MARKER_SIZES = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const);

export const FLOATING_MARKER_ANCHOR_POSITIONS = Object.freeze({
  none: 'none',
  topLeft: 'top-left',
  topRight: 'top-right',
  bottomRight: 'bottom-right',
  bottomLeft: 'bottom-left',
} as const);

export const FLOATING_MARKER_ANCHOR_TYPES = Object.freeze({
  circle: 'circle',
  square: 'square',
  xxSmallCircle: 'xx-small-circle',
  xxSmallSquare: 'xx-small-square',
} as const);

export const dragShadowHeight = 4;
export const dragShadowMarginTop = 6;
export const dragShadowWidth = 6;
export const anchorSize = 16;

const labelSmall = 'LabelSmall';
export const LABEL_SIZES = {
  [PINHEAD_SIZES_SHAPES.xxSmallCircle]: labelSmall,
  [PINHEAD_SIZES_SHAPES.xxSmallSquare]: labelSmall,
  [PINHEAD_SIZES_SHAPES.xSmallCircle]: labelSmall,
  [PINHEAD_SIZES_SHAPES.xSmallSquare]: labelSmall,
  [PINHEAD_SIZES_SHAPES.small]: labelSmall,
  [PINHEAD_SIZES_SHAPES.medium]: 'LabelMedium',
  [PINHEAD_SIZES_SHAPES.large]: 'LabelLarge',
};

export const LABEL_ENHANCER_POSITIONS = Object.freeze({
  none: 'none',
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',
} as const);

export const BADGE_ENHANCER_SIZES = Object.freeze({
  none: 'none',
  xSmall: 'x-small',
  small: 'small',
  mediumText: 'medium-text',
  mediumIcon: 'medium-icon',
} as const);

const xSmallPinheadBadge = {
  [BADGE_ENHANCER_SIZES.none]: null,
  [BADGE_ENHANCER_SIZES.xSmall]: {
    x: -5,
    y: -3,
  },
  [BADGE_ENHANCER_SIZES.small]: null,
  [BADGE_ENHANCER_SIZES.mediumText]: null,
  [BADGE_ENHANCER_SIZES.mediumIcon]: null,
};
export const BADGE_ENHANCER_POSITIONS = {
  [PINHEAD_SIZES_SHAPES.xxSmallSquare]: null,
  [PINHEAD_SIZES_SHAPES.xxSmallCircle]: null,
  [PINHEAD_SIZES_SHAPES.xSmallSquare]: xSmallPinheadBadge,
  [PINHEAD_SIZES_SHAPES.xSmallCircle]: xSmallPinheadBadge,
  [PINHEAD_SIZES_SHAPES.small]: {
    [BADGE_ENHANCER_SIZES.none]: null,
    [BADGE_ENHANCER_SIZES.xSmall]: {
      x: -7,
      y: -1,
    },
    [BADGE_ENHANCER_SIZES.small]: {
      x: -8,
      y: -8,
    },
    [BADGE_ENHANCER_SIZES.mediumText]: null,
    [BADGE_ENHANCER_SIZES.mediumIcon]: null,
  },
  [PINHEAD_SIZES_SHAPES.medium]: {
    [BADGE_ENHANCER_SIZES.none]: null,
    [BADGE_ENHANCER_SIZES.xSmall]: {
      x: -9,
      y: 1,
    },
    [BADGE_ENHANCER_SIZES.small]: {
      x: -10,
      y: -4,
    },
    [BADGE_ENHANCER_SIZES.mediumText]: {
      x: -12,
      y: -8,
    },
    [BADGE_ENHANCER_SIZES.mediumIcon]: {
      x: -12,
      y: -8,
    },
  },
  [PINHEAD_SIZES_SHAPES.large]: {
    [BADGE_ENHANCER_SIZES.none]: null,
    [BADGE_ENHANCER_SIZES.xSmall]: {
      x: -11,
      y: 3,
    },
    [BADGE_ENHANCER_SIZES.small]: null,
    [BADGE_ENHANCER_SIZES.mediumText]: {
      x: -14,
      y: -6,
    },
    [BADGE_ENHANCER_SIZES.mediumIcon]: {
      x: -14,
      y: -6,
    },
  },
};

export const BADGE_ENHANCER_STYLES = {
  [BADGE_ENHANCER_SIZES.none]: {},
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
  [BADGE_ENHANCER_SIZES.mediumText]: {
    borderRadius: '10px',
    height: '20px',
    padding: '0px 8px',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  [BADGE_ENHANCER_SIZES.mediumIcon]: {
    height: '20px',
    width: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
} as const;

export const BADGE_ENHANCER_CONTENT_SIZE = {
  [BADGE_ENHANCER_SIZES.none]: 0,
  [BADGE_ENHANCER_SIZES.xSmall]: 0,
  [BADGE_ENHANCER_SIZES.small]: 10,
  [BADGE_ENHANCER_SIZES.mediumText]: 12,
  [BADGE_ENHANCER_SIZES.mediumIcon]: 12,
};

export const KIND = Object.freeze({
  default: 'default',
  accent: 'accent',
  negative: 'negative',
} as const);

export const LOCATION_PUCK_SIZES = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const);

export const LOCATION_PUCK_TYPES = Object.freeze({
  consumer: 'consumer',
  earner: 'earner',
} as const);

export const EARNER_LOCATION_PUCK_CORE_SCALES = Object.freeze({
  [LOCATION_PUCK_SIZES.small]: '50%',
  [LOCATION_PUCK_SIZES.medium]: '75%',
  [LOCATION_PUCK_SIZES.large]: '100%',
} as const);

export const FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS = Object.freeze({
  topLeft: 'top-left',
  topCenter: 'top-center',
  topRight: 'top-right',
  rightCenter: 'right-center',
  bottomRight: 'bottom-right',
  bottomCenter: 'bottom-center',
  bottomLeft: 'bottom-left',
  leftCenter: 'left-center',
} as const);

export const FLOATING_ROUTE_MARKER_POINTER_TYPES = Object.freeze({
  diagonal: 'diagonal',
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const);

export const FLOATING_ROUTE_MARKER_POINTERS = Object.freeze({
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topLeft]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.diagonal,
    path: 'M0 0L24 8L8 24L0 0Z',
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topRight]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.diagonal,
    path: 'M24 0L0 8L16 24L24 0Z',
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topCenter]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.vertical,
    path: 'M8.49928 0L0.499411 8L16.5006 8L8.49928 0Z',
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomLeft]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.diagonal,
    path: 'M0 24L24 16L8 0L0 24Z',
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomRight]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.diagonal,
    path: 'M24 24L0 16L16 0L24 24Z',
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomCenter]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.vertical,
    path: 'M8.00133 8L16.0012 0H0L8.00133 8Z',
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.leftCenter]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.horizontal,
    path: 'M0.000610352 8.00059L8.00061 16.0005L8.00061 -0.000732422L0.000610352 8.00059Z',
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.rightCenter]: {
    type: FLOATING_ROUTE_MARKER_POINTER_TYPES.horizontal,
    path: 'M8.00061 7.99916L0.000610352 -0.000711441L0.000610352 16.0005L8.00061 7.99916Z',
  },
} as const);

export const FLOATING_ROUTE_MARKER_POINTER_TRANSFORMS = Object.freeze({
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topLeft]: {
    transform: `translate(-33.33%, -33.33%)`,
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topRight]: {
    right: 0,
    transform: `translate(33.33%, -33.33%)`,
  },

  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomLeft]: {
    transform: `translate(-33.33%, 33.33%)`,
    bottom: 0,
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomRight]: {
    right: 0,
    transform: `translate(33.33%, 33.33%)`,
    bottom: 0,
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topCenter]: {
    right: '50%',
    transform: `translate(50%, -100%)`,
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomCenter]: {
    bottom: 0,
    right: '50%',
    transform: `translate(50%, 100%)`,
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.leftCenter]: {
    top: '50%',
    transform: `translate(-100%, -50%)`,
  },
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.rightCenter]: {
    left: '100%',
    top: '50%',
    transform: `translate(0%, -50%)`,
  },
} as const);

export const FLOATING_ROUTE_MARKER_POINTER_TYPE_WRAPPER_SIZES = Object.freeze({
  [FLOATING_ROUTE_MARKER_POINTER_TYPES.diagonal]: {
    height: '24',
    width: '24',
    viewBox: '0 0 24 24',
  },
  [FLOATING_ROUTE_MARKER_POINTER_TYPES.vertical]: {
    height: '8',
    width: '17',
    viewBox: '0 0 17 8',
  },
  [FLOATING_ROUTE_MARKER_POINTER_TYPES.horizontal]: {
    height: '16',
    width: '8',
    viewBox: '0 0 8 16',
  },
} as const);
