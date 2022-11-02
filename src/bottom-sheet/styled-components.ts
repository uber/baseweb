/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';

export const StyledRoot = styled<'div', { $position: string | false }>(
  'div',
  ({ $position, $theme }) => {
    return $position
      ? {
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: $position,
          left: 0,
          overflow: 'hidden',
          backgroundColor: $theme.colors.backgroundPrimary,
          borderTopLeftRadius: $theme.borders.radius500,
          borderTopRightRadius: $theme.borders.radius500,
          transition: 'top 300ms ease-in',
        }
      : {
          backgroundColor: $theme.colors.backgroundPrimary,
          border: '1px solid purple',
          borderTopLeftRadius: $theme.borders.radius500,
          borderTopRightRadius: $theme.borders.radius500,
        };
  }
);

export const StyledHeader = styled<'div', { $isDraggable: boolean }>(
  'div',
  ({ $theme, $isDraggable }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: $isDraggable ? $theme.sizing.scale800 : $theme.sizing.scale300,
    paddingRight: $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale300,
    paddingLeft: $theme.sizing.scale600,
  })
);

export const StyledContent = styled<'div', {}>('div', ({ $theme }) => ({
  height: '100%',
  overflow: 'auto',
}));

// TODO: should this be an h1 or similar?
export const StyledTitle = styled<'div', {}>('div', ({ $theme }) => ({
  color: $theme.colors.contentPrimary,
  ...$theme.typography.LabelLarge,
}));

export const StyledDescription = styled<'div', {}>('div', ({ $theme }) => ({
  color: $theme.colors.contentSecondary,
  ...$theme.typography.ParagraphMedium,
}));
