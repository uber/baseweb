/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import { ALIGNMENT } from './constants';
import { TILE_KIND } from './constants';

export const StyledTileRoot = styled<
  'button',
  {
    $tileKind: keyof typeof TILE_KIND;
    $selected: boolean;
  }
  // @ts-ignore
>('button', ({ $theme, $tileKind, $selected }) => ({
  borderTopRightRadius: '12px',
  borderBottomRightRadius: '12px',
  borderBottomLeftRadius: '12px',
  borderTopLeftRadius: '12px',
  paddingTop: '16px',
  paddingRight: '16px',
  paddingBottom: '16px',
  paddingLeft: '16px',
  display: 'inline-block',
  minWidth: '163.5px',
  textDecoration: 'none',
  WebkitAppearance: 'none',
  transitionProperty: 'background',
  transitionDuration: $theme.animation.timing200,
  transitionTimingFunction: $theme.animation.linearCurve,
  cursor: 'pointer',
  ':disabled': {
    cursor: 'not-allowed',
    ...getDisabledStyles({ $theme, $tileKind }),
  },
  ...getRootButtonColors({ $theme, $tileKind, $selected }),
}));

export const StyledTileGroupRoot = styled<'div', { $length: number }>('div', ({ $theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: $theme.sizing.scale600,
}));

export const StyledHeaderContainer = styled<
  'div',
  {
    $leadingContent?: boolean;
    $trailingContent?: boolean;
    $alignment?: keyof typeof ALIGNMENT;
  }
>('div', ({ $leadingContent, $trailingContent, $alignment }) => ({
  display: 'flex',
  ...getContainerAlignment({ $leadingContent, $trailingContent, $alignment }),
  alignItems: 'center',
  marginBottom: '16px',
}));

export const StyledLeadingContentContainer = styled('div', ({ $theme }) => ({
  marginRight: $theme.sizing.scale300,
  ':last-child': {
    marginRight: '0px',
  },
}));

export const StyledTrailingContentContainer = styled('div', () => ({}));

export const StyledBodyContainer = styled<'div', { $alignment?: keyof typeof ALIGNMENT }>(
  'div',
  ({ $alignment }) => ({
    width: '100%',
    display: 'flex',
    ...getContainerAlignment({ $alignment }),
  })
);

export const StyledBodyContainerContent = styled('div', () => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
}));

export const StyledLabel = styled<
  'p',
  {
    $disabled?: boolean;
  }
>('p', ({ $theme, $disabled }) => ({
  ...$theme.typography.LabelMedium,
  color: $disabled ? $theme.colors.contentStateDisabled : $theme.colors.contentPrimary,
  marginTop: 0,
  marginBottom: 0,
}));

export const StyledParagraph = styled<
  'p',
  {
    $disabled?: boolean;
  }
>('p', ({ $theme, $disabled }) => ({
  ...$theme.typography.ParagraphSmall,
  color: $disabled ? $theme.colors.contentStateDisabled : $theme.colors.contentPrimary,
  marginTop: '4px',
  marginBottom: 0,
}));

export function getContainerAlignment({
  $alignment,
  $leadingContent,
  $trailingContent,
}: {
  $alignment: keyof typeof ALIGNMENT | undefined;
  $leadingContent?: boolean | undefined;
  $trailingContent?: boolean | undefined;
}) {
  if ($leadingContent && $trailingContent) {
    return { justifyContent: 'space-between' };
  }

  if ($trailingContent && !$leadingContent && !$alignment) {
    return { justifyContent: 'flex-end' };
  }

  switch ($alignment) {
    case ALIGNMENT.center:
      return { justifyContent: 'center' };
    case ALIGNMENT.right:
      return { justifyContent: 'flex-end' };
    case ALIGNMENT.left:
    default:
      return { justifyContent: 'flex-start' };
  }
}

export function getRootButtonColors({ $tileKind, $theme, $selected }) {
  const borderWidth = $selected ? '3px' : '2px';
  const borderColor = $selected ? $theme.colors.borderSelected : $theme.colors.borderOpaque;

  switch ($tileKind) {
    case TILE_KIND.selection:
      return {
        backgroundColor: $theme.colors.backgroundPrimary,
        borderTopWidth: borderWidth,
        borderRightWidth: borderWidth,
        borderBottomWidth: borderWidth,
        borderLeftWidth: borderWidth,
        borderTopStyle: 'solid',
        borderRightStyle: 'solid',
        borderBottomStyle: 'solid',
        borderLeftStyle: 'solid',
        borderTopColor: borderColor,
        borderRightColor: borderColor,
        borderBottomColor: borderColor,
        borderLeftColor: borderColor,
        ':hover:enabled': {
          backgroundColor: $theme.colors.buttonTertiaryHover,
        },
        ':active:enabled': {
          backgroundColor: $theme.colors.buttonTertiaryActive,
        },
      };
    default:
      return {
        backgroundColor: $theme.colors.backgroundSecondary,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopStyle: 'none',
        borderRightStyle: 'none',
        borderBottomStyle: 'none',
        borderLeftStyle: 'none',
        ':hover:enabled': {
          backgroundColor: $theme.colors.buttonSecondaryHover,
        },
        ':active:enabled': {
          backgroundColor: $theme.colors.buttonSecondaryActive,
        },
      };
  }
}

export function getDisabledStyles({ $theme, $tileKind }) {
  switch ($tileKind) {
    case TILE_KIND.selection:
      return {
        backgroundColor: $theme.colors.backgroundPrimary,
        color: $theme.colors.contentStateDisabled,
        borderTopWidth: '2px',
        borderRightWidth: '2px',
        borderBottomWidth: '2px',
        borderLeftWidth: '2px',
        borderTopStyle: 'solid',
        borderRightStyle: 'solid',
        borderBottomStyle: 'solid',
        borderLeftStyle: 'solid',
        borderTopColor: $theme.colors.borderStateDisabled,
        borderRightColor: $theme.colors.borderStateDisabled,
        borderBottomColor: $theme.colors.borderStateDisabled,
        borderLeftColor: $theme.colors.borderStateDisabled,
      };

    default:
      return {};
  }
}
