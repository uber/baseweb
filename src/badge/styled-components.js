/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import { styled } from '../styles/index.js';
import type { PlacementT, ColorT, ShapeT, RoleT, OffsetT, HierarchyT } from './types.js';
import { COLOR, SHAPE, POSITION_STYLES, PLACEMENT, HIERARCHY } from './constants.js';

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

export const StyledRoot = styled<{}>('div', () => {
  return {
    position: 'relative',
    display: 'inline-block',
  };
});

export const StyledInlineBadge = styled<{
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

export const StyledPositioner = styled<{
  $role: RoleT,
  $placement: PlacementT,
  $horizontalOffset: ?OffsetT,
  $verticalOffset: ?OffsetT,
}>('div', ({ $theme, $role, $placement, $horizontalOffset, $verticalOffset }) => {
  let positionStyle = POSITION_STYLES[$placement][$role];

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
    // TODO(LUKE): this seems hacky 🤔
    height: '20px',
    lineHeight: 'initial',
  };
});
