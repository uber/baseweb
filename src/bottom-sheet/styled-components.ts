/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';

export const StyledRoot = styled<'div', {}>('div', ({}) => {
  return { display: 'flex', flexDirection: 'column', height: '100%' };
});

export const StyledBottomContainer = styled<'div', { $position: string | false }>(
  'div',
  ({ $position, $theme }) => {
    const baseStyle = {
      flexShrink: 0,
      backgroundColor: $theme.colors.backgroundPrimary,
      borderTopLeftRadius: $theme.borders.radius500,
      borderTopRightRadius: $theme.borders.radius500,
    };
    return $position
      ? {
          width: '100%',
          height: $position,
          position: 'relative',
          // bottom: $position,
          left: 0,
          transition: 'height 300ms ease-in',
          ...baseStyle,
        }
      : { ...baseStyle };
  }
);

export const StyledHeader = styled<'div', { $isDraggable: boolean }>(
  'div',
  ({ $theme, $isDraggable }) => ({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    // paddingTop: $isDraggable ? $theme.sizing.scale800 : $theme.sizing.scale300,
    paddingTop: $theme.sizing.scale300,
    paddingRight: $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale300,
    paddingLeft: $theme.sizing.scale600,
  })
);

export const StyledHeaderInner = styled<'div', { $isDraggable: boolean }>('div', ({ $theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gridColumn: '2 / 3',
}));

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

export const StyledGrabber = styled<'button', {}>('button', ({ $theme }) => ({
  // reset button styles
  '-webkit-appearance': 'none',
  borderRadius: 0,
  textAlign: 'inherit',
  background: 'none',
  boxShadow: 'none',
  padding: 0,
  cursor: 'pointer',
  border: 'none',
  color: 'inherit',
  font: 'inherit',
  // other styles
  // position: 'absolute',
  // top: '-24px',
  width: `calc(100% + ${$theme.sizing.scale600} + ${$theme.sizing.scale600})`,
  // paddingTop: '34px',
  paddingRight: 'auto',
  paddingBottom: '10px',
  paddingLeft: 'auto',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  // interior
  ':before': {
    content: '""',
    position: 'absolute',
    top: '-34px',
    height: '34px',
    width: '100%',
  },
  ':after': {
    content: '""',
    height: $theme.sizing.scale100,
    width: $theme.sizing.scale1200,
    background: $theme.colors.borderOpaque,
    borderRadius: '100px',
    margin: '0 auto',
  },
}));
