/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles/index';
import { ACTION_POSITION } from './constants';
import type { ActionPosition } from './types';

export const StyledRoot = styled<
  'div',
  {
    $backgroundColor: string;
    $color: string;
    $nested: boolean;
  }
>('div', ({ $theme, $backgroundColor, $color, $nested }) => {
  const radius = $nested ? $theme.borders.radius300 : $theme.borders.radius400;
  return {
    backgroundColor: $backgroundColor,
    borderStartStartRadius: radius,
    borderStartEndRadius: radius,
    borderEndStartRadius: radius,
    borderEndEndRadius: radius,
    color: $color,
    display: 'grid',
    gridColumnGap: $theme.sizing.scale600,
    gridTemplateColumns: 'min-content auto min-content',
    gridTemplateRows: 'auto min-content',
    margin: $theme.sizing.scale600,
  };
});

export const StyledLeadingContent = styled<
  'div',
  {
    $includesArtwork: boolean;
  }
>('div', ({ $theme, $includesArtwork }) => {
  return {
    alignItems: 'center',
    display: 'flex',
    paddingInlineStart: $includesArtwork ? $theme.sizing.scale600 : null,
  };
});

export const StyledMessageContent = styled<
  'div',
  {
    $actionPosition: ActionPosition;
  }
>('div', ({ $theme, $actionPosition }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBlockStart: $theme.sizing.scale600,
    paddingBlockEnd: $actionPosition === ACTION_POSITION.trailing ? $theme.sizing.scale600 : null,
  };
});

export const StyledTrailingContent = styled<'div', {}>('div', ({ $theme }) => {
  return {
    display: 'flex',
    gridRowEnd: 'span 2',
    marginInlineStart: 'auto',
  };
});

export const StyledBelowContent = styled<
  'div',
  {
    $actionPosition: ActionPosition;
  }
>('div', ({ $theme, $actionPosition }) => {
  return {
    gridColumnStart: 2,
    paddingBlockStart: $actionPosition === ACTION_POSITION.below ? $theme.sizing.scale300 : null,
    paddingBlockEnd: $actionPosition === ACTION_POSITION.below ? $theme.sizing.scale600 : null,
  };
});

export const StyledTitle = styled<'div', {}>('div', ({ $theme }) => {
  return $theme.typography.LabelMedium;
});

export const StyledMessage = styled<'div', {}>('div', ({ $theme }) => {
  return $theme.typography.ParagraphMedium;
});

export const StyledTrailingButtonContainer = styled<'div', {}>('div', ({ $theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    paddingInlineEnd: $theme.sizing.scale600,
  };
});

export const StyledTrailingIconButton = styled<
  'button',
  {
    $nested: boolean;
  }
>('button', ({ $theme, $nested }) => {
  const radius = $nested ? $theme.borders.radius300 : $theme.borders.radius400;
  return {
    alignItems: 'center',
    background: 'none',
    border: 'none',
    borderStartEndRadius: radius,
    borderEndEndRadius: radius,
    color: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    paddingInlineStart: $theme.sizing.scale600,
    paddingInlineEnd: $theme.sizing.scale600,
    ':hover': {
      boxShadow: 'inset 999px 999px 0px rgba(0, 0, 0, 0.04)',
    },
    ':active': {
      boxShadow: 'inset 999px 999px 0px rgba(0, 0, 0, 0.08)',
    },
  };
});
