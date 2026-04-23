/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import type { Theme } from '../styles';
import type { Placement, Color, Shape, Role, Hierarchy, NotificationCircleSize } from './types';
import { COLOR, SHAPE, ROLE, PLACEMENT, HIERARCHY, NOTIFICATION_CIRCLE_SIZE } from './constants';

// @ts-ignore
function getColorStyles({ $theme, $hierarchy, $color }): {
  color: string;
  backgroundColor: string;
} {
  const COLOR_STYLES = {
    [HIERARCHY.primary]: {
      [COLOR.accent]: {
        color: $theme.colors.contentOnColor,
        backgroundColor: $theme.colors.backgroundAccent,
      },
      [COLOR.primary]: {
        color: $theme.colors.contentInversePrimary,
        backgroundColor: $theme.colors.backgroundInversePrimary,
      },
      [COLOR.positive]: {
        color: $theme.colors.contentOnColor,
        backgroundColor: $theme.colors.backgroundPositive,
      },
      [COLOR.negative]: {
        color: $theme.colors.contentOnColor,
        backgroundColor: $theme.colors.backgroundNegative,
      },
      [COLOR.warning]: {
        color: $theme.colors.contentOnColorInverse,
        backgroundColor: $theme.colors.backgroundWarning,
      },
      [COLOR.onBrand]: {
        color: $theme.colors.brandBackgroundPrimary,
        backgroundColor: $theme.colors.brandContentOnPrimary,
      },
    },
    [HIERARCHY.secondary]: {
      [COLOR.accent]: {
        color: $theme.colors.contentAccent,
        backgroundColor: $theme.colors.backgroundAccentLight,
      },
      [COLOR.primary]: {
        color: $theme.colors.contentPrimary,
        backgroundColor: $theme.colors.backgroundSecondary,
      },
      [COLOR.positive]: {
        color: $theme.colors.contentPositive,
        backgroundColor: $theme.colors.backgroundPositiveLight,
      },
      [COLOR.negative]: {
        color: $theme.colors.contentNegative,
        backgroundColor: $theme.colors.backgroundNegativeLight,
      },
      [COLOR.warning]: {
        color: $theme.colors.contentWarning,
        backgroundColor: $theme.colors.backgroundWarningLight,
      },
    },
  };

  // @ts-ignore
  return COLOR_STYLES[$hierarchy][$color];
}

function getPositionStyles($theme: Theme) {
  const defaultNotificationCirclePlacement = {
    insetBlockStart: `-${$theme.sizing.scale400}`,
    insetInlineEnd: `-${$theme.sizing.scale400}`,
  };
  const defaultHintDotPlacement = {
    insetBlockStart: `-${$theme.sizing.scale100}`,
    insetInlineEnd: `-${$theme.sizing.scale100}`,
  };
  return {
    [ROLE.badge]: {
      [PLACEMENT.topEdge]: {
        insetBlockStart: `-${$theme.sizing.scale300}`,
        left: '50%', // special case not using insetInlineStart since there is a transform to move left by 50% of its own width
        transform: 'translateX(-50%)',
      },
      [PLACEMENT.bottomEdge]: {
        insetBlockEnd: `-${$theme.sizing.scale300}`,
        left: '50%', // special case not using insetInlineStart since there is a transform to move left by 50% of its own width
        transform: 'translateX(-50%)',
      },
      [PLACEMENT.topLeft]: {
        insetBlockStart: $theme.sizing.scale600,
        insetInlineStart: $theme.sizing.scale600,
      },
      [PLACEMENT.topRight]: {
        insetBlockStart: $theme.sizing.scale600,
        insetInlineEnd: $theme.sizing.scale600,
      },
      [PLACEMENT.bottomRight]: {
        insetBlockEnd: $theme.sizing.scale600,
        insetInlineEnd: $theme.sizing.scale600,
      },
      [PLACEMENT.bottomLeft]: {
        insetBlockEnd: $theme.sizing.scale600,
        insetInlineStart: $theme.sizing.scale600,
      },
      [PLACEMENT.topLeftEdge]: {
        insetBlockStart: `-${$theme.sizing.scale300}`,
        insetInlineStart: $theme.sizing.scale600,
      },
      [PLACEMENT.topRightEdge]: {
        insetBlockStart: `-${$theme.sizing.scale300}`,
        insetInlineEnd: $theme.sizing.scale600,
      },
      [PLACEMENT.bottomRightEdge]: {
        insetBlockEnd: `-${$theme.sizing.scale300}`,
        insetInlineEnd: $theme.sizing.scale600,
      },
      [PLACEMENT.bottomLeftEdge]: {
        insetBlockEnd: `-${$theme.sizing.scale300}`,
        insetInlineStart: $theme.sizing.scale600,
      },
      [PLACEMENT.leftTopEdge]: {
        insetBlockStart: $theme.sizing.scale600,
        insetInlineStart: `-${$theme.sizing.scale300}`,
      },
      [PLACEMENT.rightTopEdge]: {
        insetBlockStart: $theme.sizing.scale600,
        insetInlineEnd: `-${$theme.sizing.scale300}`,
      },
      [PLACEMENT.rightBottomEdge]: {
        insetBlockEnd: $theme.sizing.scale600,
        insetInlineEnd: `-${$theme.sizing.scale300}`,
      },
      [PLACEMENT.leftBottomEdge]: {
        insetBlockEnd: $theme.sizing.scale600,
        insetInlineStart: `-${$theme.sizing.scale300}`,
      },
    },
    [ROLE.notificationCircle]: {
      [PLACEMENT.topLeft]: {
        insetBlockStart: `-${$theme.sizing.scale400}`,
        insetInlineStart: `-${$theme.sizing.scale400}`,
      },
      [PLACEMENT.topRight]: defaultNotificationCirclePlacement,
      [PLACEMENT.bottomRight]: {
        insetBlockEnd: `-${$theme.sizing.scale400}`,
        insetInlineEnd: `-${$theme.sizing.scale400}`,
      },
      [PLACEMENT.bottomLeft]: {
        insetBlockEnd: `-${$theme.sizing.scale400}`,
        insetInlineStart: `-${$theme.sizing.scale400}`,
      },
      // NotificationCircle can only be placed topLeft, topRight, bottomLeft, or bottomRight, other values fall back to topRight
      [PLACEMENT.topEdge]: defaultNotificationCirclePlacement,
      [PLACEMENT.bottomEdge]: defaultNotificationCirclePlacement,
      [PLACEMENT.topLeftEdge]: defaultNotificationCirclePlacement,
      [PLACEMENT.topRightEdge]: defaultNotificationCirclePlacement,
      [PLACEMENT.bottomRightEdge]: defaultNotificationCirclePlacement,
      [PLACEMENT.bottomLeftEdge]: defaultNotificationCirclePlacement,
      [PLACEMENT.leftTopEdge]: defaultNotificationCirclePlacement,
      [PLACEMENT.rightTopEdge]: defaultNotificationCirclePlacement,
      [PLACEMENT.rightBottomEdge]: defaultNotificationCirclePlacement,
      [PLACEMENT.leftBottomEdge]: defaultNotificationCirclePlacement,
    },
    [ROLE.hintDot]: {
      // For now, we only need to support topLeft, topRight, bottomLeft and bottomRight. Others are considered as an invalid placement prop.
      [PLACEMENT.topLeft]: {
        insetBlockStart: `-${$theme.sizing.scale100}`,
        insetInlineStart: `-${$theme.sizing.scale100}`,
      },
      [PLACEMENT.topRight]: defaultHintDotPlacement,
      [PLACEMENT.bottomRight]: {
        insetBlockEnd: `-${$theme.sizing.scale100}`,
        insetInlineEnd: `-${$theme.sizing.scale100}`,
      },
      [PLACEMENT.bottomLeft]: {
        insetBlockEnd: `-${$theme.sizing.scale100}`,
        insetInlineStart: `-${$theme.sizing.scale100}`,
      },
      // unsupported placements fall back to topRight
      [PLACEMENT.topEdge]: defaultHintDotPlacement,
      [PLACEMENT.topLeftEdge]: defaultHintDotPlacement,
      [PLACEMENT.topRightEdge]: defaultHintDotPlacement,
      [PLACEMENT.bottomEdge]: defaultHintDotPlacement,
      [PLACEMENT.bottomRightEdge]: defaultHintDotPlacement,
      [PLACEMENT.bottomLeftEdge]: defaultHintDotPlacement,
      [PLACEMENT.leftTopEdge]: defaultHintDotPlacement,
      [PLACEMENT.rightTopEdge]: defaultHintDotPlacement,
      [PLACEMENT.rightBottomEdge]: defaultHintDotPlacement,
      [PLACEMENT.leftBottomEdge]: defaultHintDotPlacement,
    },
  };
}

// This is designed for hint badge. This data structure make future extension on other badges possible.
function getPositionStrokeOffStyles($theme: Theme) {
  const defaultHintDotPlacement = {
    insetBlockStart: `-${$theme.sizing.scale0}`,
    insetInlineEnd: `-${$theme.sizing.scale0}`,
  };
  return {
    [ROLE.hintDot]: {
      // For now, we only need to support topLeft, topRight, bottomLeft and bottomRight. Others are considered as an invalid placement prop.
      [PLACEMENT.topLeft]: {
        insetBlockStart: `-${$theme.sizing.scale0}`,
        insetInlineStart: `-${$theme.sizing.scale0}`,
      },
      [PLACEMENT.topRight]: defaultHintDotPlacement,
      [PLACEMENT.bottomRight]: {
        insetBlockEnd: `-${$theme.sizing.scale0}`,
        insetInlineEnd: `-${$theme.sizing.scale0}`,
      },
      [PLACEMENT.bottomLeft]: {
        insetBlockEnd: `-${$theme.sizing.scale0}`,
        insetInlineStart: `-${$theme.sizing.scale0}`,
      },
      // unsupported placements fall back to topRight
      [PLACEMENT.topEdge]: defaultHintDotPlacement,
      [PLACEMENT.topLeftEdge]: defaultHintDotPlacement,
      [PLACEMENT.topRightEdge]: defaultHintDotPlacement,
      [PLACEMENT.bottomEdge]: defaultHintDotPlacement,
      [PLACEMENT.bottomRightEdge]: defaultHintDotPlacement,
      [PLACEMENT.bottomLeftEdge]: defaultHintDotPlacement,
      [PLACEMENT.leftTopEdge]: defaultHintDotPlacement,
      [PLACEMENT.rightTopEdge]: defaultHintDotPlacement,
      [PLACEMENT.rightBottomEdge]: defaultHintDotPlacement,
      [PLACEMENT.leftBottomEdge]: defaultHintDotPlacement,
    },
  };
}

export const StyledRoot = styled<'div', {}>('div', () => {
  return {
    position: 'relative',
    display: 'inline-block',
    lineHeight: 'initial',
  };
});

StyledRoot.displayName = 'StyledRoot';

const TOP_PLACEMENTS: Placement[] = [
  PLACEMENT.topLeft,
  PLACEMENT.topRight,
  PLACEMENT.topLeftEdge,
  PLACEMENT.topEdge,
  PLACEMENT.topRightEdge,
  PLACEMENT.leftTopEdge,
  PLACEMENT.rightTopEdge,
];
const BOTTOM_PLACEMENTS: Placement[] = [
  PLACEMENT.bottomLeft,
  PLACEMENT.bottomRight,
  PLACEMENT.bottomLeftEdge,
  PLACEMENT.bottomEdge,
  PLACEMENT.bottomRightEdge,
  PLACEMENT.leftBottomEdge,
  PLACEMENT.rightBottomEdge,
];
const LEFT_PLACEMENTS: Placement[] = [
  PLACEMENT.topLeft,
  PLACEMENT.topLeftEdge,
  PLACEMENT.topEdge,
  PLACEMENT.bottomLeft,
  PLACEMENT.bottomLeftEdge,
  PLACEMENT.bottomEdge,
  PLACEMENT.leftTopEdge,
  PLACEMENT.leftBottomEdge,
];
const RIGHT_PLACEMENTS: Placement[] = [
  PLACEMENT.topRight,
  PLACEMENT.topRightEdge,
  PLACEMENT.bottomRight,
  PLACEMENT.bottomRightEdge,
  PLACEMENT.rightTopEdge,
  PLACEMENT.rightBottomEdge,
];

export const StyledPositioner = styled<
  'div',
  {
    $role: Role;
    $placement: Placement;
    $horizontalOffset?: string | null;
    $verticalOffset?: string | null;
    $noAnchor?: boolean;
    $hasBorder?: boolean;
  }
>(
  'div',
  ({
    $theme,
    $role,
    $placement,
    $horizontalOffset,
    $verticalOffset,
    $noAnchor = false,
    $hasBorder = true,
  }) => {
    // If no anchor and no offset specified, the hintBadge should not have any offsets.
    if (
      $role === ROLE.hintDot &&
      $noAnchor &&
      $horizontalOffset === undefined &&
      $verticalOffset === undefined
    )
      return {};

    let positionStyle =
      $role === ROLE.hintDot && !$hasBorder
        ? getPositionStrokeOffStyles($theme)[$role][$placement]
        : getPositionStyles($theme)[$role][$placement];

    if ($verticalOffset) {
      if (TOP_PLACEMENTS.includes($placement)) {
        positionStyle = { ...positionStyle, insetBlockStart: $verticalOffset };
      }
      if (BOTTOM_PLACEMENTS.includes($placement)) {
        positionStyle = { ...positionStyle, insetBlockEnd: $verticalOffset };
      }
    }

    if ($horizontalOffset) {
      if (LEFT_PLACEMENTS.includes($placement)) {
        positionStyle = { ...positionStyle, insetInlineStart: $horizontalOffset };
      }
      if (RIGHT_PLACEMENTS.includes($placement)) {
        positionStyle = { ...positionStyle, insetInlineEnd: $horizontalOffset };
      }
    }

    return {
      ...positionStyle,
      position: 'absolute',
      lineHeight: 'initial',
    };
  }
);

StyledPositioner.displayName = 'StyledPositioner';

export const StyledBadge = styled<
  'div',
  {
    $shape?: Shape;
    $color?: Color;
    $hierarchy?: Hierarchy;
    $hidden?: boolean;
  }
>(
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

StyledBadge.displayName = 'StyledBadge';

export const StyledNotificationCircle = styled<
  'div',
  {
    $color?: Color;
    $hidden?: boolean;
    $size?: NotificationCircleSize;
    $extraPadding?: boolean;
  }
>('div', ({ $theme, $color = COLOR.accent, $hidden, $size, $extraPadding }) => {
  const sizeDimension =
    $size === NOTIFICATION_CIRCLE_SIZE.small ? $theme.sizing.scale600 : $theme.sizing.scale700;
  const paddingDimension =
    $size === NOTIFICATION_CIRCLE_SIZE.small
      ? $extraPadding
        ? $theme.sizing.scale100
        : $theme.sizing.scale0
      : $extraPadding
      ? '6.5px'
      : $theme.sizing.scale100;

  return {
    visibility: $hidden ? 'hidden' : 'inherit',
    height: sizeDimension,
    minWidth: sizeDimension,
    boxSizing: 'border-box',
    paddingLeft: paddingDimension,
    paddingRight: paddingDimension,
    borderRadius: sizeDimension,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...getColorStyles({ $theme, $hierarchy: HIERARCHY.primary, $color }),
    ...($size === NOTIFICATION_CIRCLE_SIZE.small
      ? $theme.typography.LabelXSmall
      : $theme.typography.LabelSmall),
  };
});

StyledNotificationCircle.displayName = 'StyledNotificationCircle';

function getHintDotColorStyles(
  $theme: Theme,
  $color: Color
): {
  backgroundColor: string;
  borderColor: string;
} {
  const styles = {
    [COLOR.accent]: {
      backgroundColor: $theme.colors.brandBackgroundPrimary,
      borderColor: $theme.colors.backgroundPrimary,
    },
    [COLOR.positive]: {
      backgroundColor: $theme.colors.contentPositive,
      borderColor: $theme.colors.backgroundPrimary,
    },
    [COLOR.warning]: {
      backgroundColor: $theme.colors.contentWarning,
      borderColor: $theme.colors.backgroundPrimary,
    },
    [COLOR.negative]: {
      backgroundColor: $theme.colors.contentNegative,
      borderColor: $theme.colors.backgroundPrimary,
    },
    [COLOR.primary]: {
      backgroundColor: $theme.colors.backgroundInversePrimary,
      borderColor: $theme.colors.backgroundPrimary,
    },
    [COLOR.onBrand]: {
      backgroundColor: $theme.colors.brandContentOnPrimary,
      borderColor: $theme.colors.brandBackgroundPrimary,
    },
  };
  return styles[$color] ?? styles[COLOR.accent];
}

export const StyledHintDot = styled<
  'div',
  {
    $color?: Color;
    $hidden?: boolean;
    $hasBorder?: boolean;
  }
>('div', ({ $theme, $color = COLOR.accent, $hidden, $hasBorder = true }) => {
  const { backgroundColor, borderColor } = getHintDotColorStyles($theme, $color);
  return {
    visibility: $hidden ? 'hidden' : 'inherit',
    backgroundColor,
    boxSizing: 'content-box',
    height: $theme.sizing.scale300, // 8px
    width: $theme.sizing.scale300, // 8px
    borderRadius: '50%',
    borderStyle: $hasBorder ? 'solid' : 'none',
    borderWidth: $theme.sizing.scale0, // 2px
    borderColor,
  };
});
StyledHintDot.displayName = 'StyledHintDot';
