/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import { getSvgStyles } from '../icon/styled-components';
import { KIND, PLACEMENT, TYPE } from './constants';
import {
  type SharedStylePropsArg,
  type ToasterSharedStylePropsArg,
  type KindType,
  type NotificationType,
  type PlacementType,
} from './types';
import type { Theme } from '../styles/types';
import type { StyleObject } from 'styletron-standard';

function getBackgroundColor(kind: KindType, type: NotificationType, theme: Theme) {
  const isInline = type === TYPE.inline;
  return {
    [KIND.info]: isInline
      ? theme.colors.notificationInfoBackground
      : theme.colors.toastInfoBackground,
    [KIND.positive]: isInline
      ? theme.colors.notificationPositiveBackground
      : theme.colors.toastPositiveBackground,
    [KIND.warning]: isInline
      ? theme.colors.notificationWarningBackground
      : theme.colors.toastWarningBackground,
    [KIND.negative]: isInline
      ? theme.colors.notificationNegativeBackground
      : theme.colors.toastNegativeBackground,
  }[kind];
}

function getFontColor(kind: KindType, type: NotificationType, theme: Theme) {
  const isInline = type === TYPE.inline;
  if (isInline) {
    return {
      [KIND.info]: theme.colors.notificationInfoText,
      [KIND.positive]: theme.colors.notificationPositiveText,
      [KIND.warning]: theme.colors.notificationWarningText,
      [KIND.negative]: theme.colors.notificationNegativeText,
    }[kind];
  }

  return {
    [KIND.info]: theme.colors.toastInfoText,
    [KIND.positive]: theme.colors.toastPositiveText,
    [KIND.warning]: theme.colors.toastWarningText,
    [KIND.negative]: theme.colors.toastNegativeText,
  }[kind];
}

export function getPlacement(placement: PlacementType): StyleObject {
  switch (placement) {
    case PLACEMENT.topLeft:
      return {
        top: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
      };
    case PLACEMENT.top:
      return {
        top: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
      };
    case PLACEMENT.topRight:
      return {
        top: 0,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        flexDirection: 'column',
      };
    case PLACEMENT.bottomRight:
      return {
        bottom: 0,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'column-reverse',
      };
    case PLACEMENT.bottom:
      return {
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column-reverse',
      };
    case PLACEMENT.bottomLeft:
      return {
        bottom: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        flexDirection: 'column-reverse',
      };
  }
}

export const Root = styled<'div', ToasterSharedStylePropsArg>(
  'div',
  ({
    $placement,
    $theme,
  }: ToasterSharedStylePropsArg & {
    $theme: Theme;
  }) => {
    return {
      pointerEvents: 'none',
      position: 'fixed',
      right: 0,
      left: 0,
      display: 'flex',
      marginTop: $theme.sizing.scale300,
      marginBottom: $theme.sizing.scale300,
      marginLeft: $theme.sizing.scale600,
      marginRight: $theme.sizing.scale600,
      ...getPlacement($placement),
    };
  }
);

Root.displayName = 'Root';

export const InnerContainer = styled<'div', SharedStylePropsArg>(
  'div', // eslint-disable-next-line no-empty-pattern
  ({}: SharedStylePropsArg & {
    $theme: Theme;
  }) => ({})
);

InnerContainer.displayName = 'InnerContainer';

export const Body = styled<'div', SharedStylePropsArg>(
  'div',
  ({
    $isVisible,
    $kind,
    $type,
    $theme,
  }: SharedStylePropsArg & {
    $theme: Theme;
  }) => {
    const isInline = $type === TYPE.inline;
    return {
      ...$theme.typography.font300,
      pointerEvents: 'auto',
      color: getFontColor($kind, $type, $theme),
      height: 'auto',
      width: '288px',
      paddingTop: $theme.sizing.scale600,
      paddingRight: $theme.sizing.scale600,
      paddingBottom: $theme.sizing.scale600,
      paddingLeft: $theme.sizing.scale600,
      marginTop: $theme.sizing.scale300,
      marginBottom: $theme.sizing.scale300,
      backgroundColor: getBackgroundColor($kind, $type, $theme) || $theme.colors.accent,
      borderTopLeftRadius: $theme.borders.radius400,
      borderTopRightRadius: $theme.borders.radius400,
      borderBottomRightRadius: $theme.borders.radius400,
      borderBottomLeftRadius: $theme.borders.radius400,
      boxShadow: isInline ? 'none' : $theme.lighting.shadow600,
      opacity: $isVisible ? 1 : 0,
      transitionProperty: 'all',
      transitionDuration: $theme.animation.timing200,
      transitionTimingFunction: $theme.animation.easeInOutCurve,
      display: 'flex',
      justifyContent: 'space-between',
    };
  }
);

Body.displayName = 'Body';

export const CloseIconSvg = styled<
  'svg',
  {
    $size: number | string;
    $color: string;
  } & SharedStylePropsArg
>(
  'svg',
  ({
    $theme,
    $size,
    $color,
    $isFocusVisible,
  }: SharedStylePropsArg & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $size: any;
    $color: string;
    $theme: Theme;
  }) => ({
    ...getSvgStyles({ $theme, $size, $color }),
    cursor: 'pointer',
    width: $size || '16px',
    flexShrink: 0,
    outline: $isFocusVisible ? `3px solid ${$theme.colors.accent}` : 'none',
  })
);
CloseIconSvg.displayName = 'CloseIconSvg';
