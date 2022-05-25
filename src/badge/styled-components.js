/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import { styled } from '../styles/index.js';
import type { PlacementT, ColorT, ShapeT, RoleT, HierarchyT } from './types.js';
import { COLOR, SHAPE, ROLE, PLACEMENT, HIERARCHY } from './constants.js';

function getColorStyles({ $theme, $hierarchy, $color }): {|
  color: string,
  backgroundColor: string,
|} {
  const COLOR_STYLES = {
    [HIERARCHY.primary]: {
      [COLOR.accent]: {
        color: $theme.colors.contentInversePrimary,
        backgroundColor: $theme.colors.backgroundAccent,
      },
      [COLOR.primary]: {
        color: $theme.colors.contentInversePrimary,
        backgroundColor: $theme.colors.backgroundInversePrimary,
      },
      [COLOR.positive]: {
        color: $theme.colors.contentInversePrimary,
        backgroundColor: $theme.colors.backgroundPositive,
      },
      [COLOR.negative]: {
        color: $theme.colors.contentInversePrimary,
        backgroundColor: $theme.colors.backgroundNegative,
      },
      [COLOR.warning]: {
        color: $theme.colors.primaryA,
        backgroundColor: $theme.colors.backgroundWarning,
      },
    },
    [HIERARCHY.secondary]: {
      [COLOR.accent]: {
        color: $theme.colors.contentAccent,
        backgroundColor: $theme.colors.backgroundLightAccent,
      },
      [COLOR.primary]: {
        color: $theme.colors.primaryA,
        backgroundColor: $theme.colors.backgroundSecondary,
      },
      [COLOR.positive]: {
        color: $theme.colors.contentPositive,
        backgroundColor: $theme.colors.backgroundLightPositive,
      },
      [COLOR.negative]: {
        color: $theme.colors.contentNegative,
        backgroundColor: $theme.colors.backgroundLightNegative,
      },
      [COLOR.warning]: {
        color: $theme.colors.contentWarning,
        backgroundColor: $theme.colors.backgroundLightWarning,
      },
    },
  };

  return COLOR_STYLES[$hierarchy][$color];
}

const POSITION_STYLES = Object.freeze({
  [ROLE.badge]: {
    [PLACEMENT.topLeft]: {
      top: '16px',
      left: '16px',
      right: null,
      bottom: null,
    },
    [PLACEMENT.top]: {
      top: '-10px',
      left: '50%',
      right: null,
      bottom: null,
      transform: 'translateX(-50%)',
    },
    [PLACEMENT.topRight]: {
      top: '16px',
      right: '16px',
      left: null,
      bottom: null,
    },
    [PLACEMENT.bottomRight]: {
      bottom: '16px',
      right: '16px',
      left: null,
      top: null,
    },
    [PLACEMENT.bottom]: {
      bottom: '-10px',
      left: '50%',
      right: null,
      top: null,
      transform: 'translateX(-50%)',
    },
    [PLACEMENT.bottomLeft]: {
      bottom: '16px',
      left: '16px',
      right: null,
      top: null,
    },
  },
  [ROLE.notificationCircle]: {
    [PLACEMENT.topLeft]: {
      top: '-10px',
      left: '-10px',
      right: null,
      bottom: null,
    },
    [PLACEMENT.topRight]: {
      top: '-10px',
      right: '-10px',
      left: null,
      bottom: null,
    },
  },
  // [ROLE.hintDot]: {
  //   [PLACEMENT.topLeft]: {},
  //   [PLACEMENT.topRight]: {},
  // },
});

export const StyledRoot = styled<{}>('div', () => {
  return {
    position: 'relative',
    display: 'inline-block',
  };
});

export const StyledBadge = styled<{
  $shape?: ShapeT,
  $color?: ColorT,
  $hierarchy?: HierarchyT,
  $hidden?: boolean,
}>(
  'div',
  ({
    $theme,
    $shape = SHAPE.rectangle,
    $color = COLOR.accent,
    $hierarchy = HIERARCHY.primary,
    $hidden,
  }) => {
    return {
      visibility: $hidden ? 'hidden' : 'inherit',
      boxSizing: 'border-box',
      height: $theme.sizing.scale700,
      borderRadius:
        $shape === SHAPE.rectangle ? $theme.borders.radius200 : $theme.borders.radius500,
      paddingRight: $shape === SHAPE.rectangle ? $theme.sizing.scale100 : $theme.sizing.scale300,
      paddingLeft: $shape === SHAPE.rectangle ? $theme.sizing.scale100 : $theme.sizing.scale300,
      display: 'inline-flex',
      alignItems: 'center',
      ...getColorStyles({ $theme, $hierarchy, $color }),
      ...($hierarchy === HIERARCHY.primary
        ? $theme.typography.LabelSmall
        : $theme.typography.ParagraphSmall),
    };
  }
);

export const StyledNotificationCircle = styled<{
  $color?: ColorT,
  $hidden?: boolean,
}>('div', ({ $theme, $color = COLOR.accent, $hidden }) => {
  return {
    visibility: $hidden ? 'hidden' : 'inherit',
    height: $theme.sizing.scale700,
    width: $theme.sizing.scale700,
    borderRadius: '20px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...getColorStyles({ $theme, $hierarchy: HIERARCHY.primary, $color }),
    ...$theme.typography.LabelXSmall,
  };
});

export const StyledPositioner = styled<{
  $role: RoleT,
  $placement: PlacementT,
  $horizontalOffset?: ?string,
  $verticalOffset?: ?string,
}>('div', ({ $theme, $role, $placement, $horizontalOffset, $verticalOffset }) => {
  // Need this for flow -- NotificationCircle & HintDot can only have topLeft or topRight placement
  const placement =
    $role !== ROLE.badge && $placement !== PLACEMENT.topLeft
      ? PLACEMENT.topRight
      : PLACEMENT.topLeft;

  let positionStyle = POSITION_STYLES[$role][placement];

  if ($verticalOffset) {
    if (
      $placement === PLACEMENT.topLeft ||
      $placement === PLACEMENT.top ||
      $placement === PLACEMENT.topRight
    ) {
      positionStyle = { ...positionStyle, top: $verticalOffset };
    }
    if (
      $placement === PLACEMENT.bottomLeft ||
      $placement === PLACEMENT.bottom ||
      $placement === PLACEMENT.bottomRight
    ) {
      positionStyle = { ...positionStyle, bottom: $verticalOffset };
    }
  }

  if ($horizontalOffset) {
    if (
      $placement === PLACEMENT.topLeft ||
      $placement === PLACEMENT.top ||
      $placement === PLACEMENT.bottomLeft ||
      $placement === PLACEMENT.bottom
    ) {
      positionStyle = { ...positionStyle, left: $horizontalOffset };
    }
    if ($placement === PLACEMENT.topRight || $placement === PLACEMENT.bottomRight) {
      positionStyle = { ...positionStyle, right: $horizontalOffset };
    }
  }

  return {
    ...positionStyle,
    position: 'absolute',
    height: 'unset',
  };
});
