/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled, withStyle } from '../styles';
import { StyledDivider as StyledDividerBase } from '../divider';

const DEFAULT_TOP_POSITION = '50vh';

export const StyledRoot = styled<'div', { $draggable: boolean }>('div', ({ $draggable }) => {
  if ($draggable) {
    return {
      height: '100%',
      position: 'relative',
    };
  }
  return {
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  };
});
StyledRoot.displayName = 'StyledRoot';

export const StyledTopContainer = styled<'div', { $draggable: boolean; $topPosition: string }>(
  'div',
  ({ $draggable, $topPosition = DEFAULT_TOP_POSITION }) => {
    const baseStyles = {
      height: '100%',
      overflow: 'auto',
    };
    if ($draggable) {
      return {
        ...baseStyles,
        maxHeight: `calc(${$topPosition} + 14px)`,
        maxWidth: '100vh',
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0px',
      };
    }

    return { ...baseStyles, marginBottom: '-14px', flexGrow: 1 };
  }
);
StyledTopContainer.displayName = 'StyledTopContainer';

export const StyledBottomContainer = styled<'div', { $draggable: boolean; $topPosition: string }>(
  'div',
  ({ $draggable, $topPosition, $theme }) => {
    const baseStyle = {
      borderTopLeftRadius: $theme.borders.radius500,
      borderTopRightRadius: $theme.borders.radius500,
      backgroundColor: $theme.colors.backgroundPrimary,
    };

    return $draggable
      ? {
          position: 'relative',
          top: $topPosition || DEFAULT_TOP_POSITION,
          overflow: 'auto',
          ...baseStyle,
        }
      : { maxHeight: $topPosition || DEFAULT_TOP_POSITION, ...baseStyle };
  }
);
StyledBottomContainer.displayName = 'StyledBottomContainer';

export const StyledHeader = styled<'div', {}>('div', ({ $theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: $theme.sizing.scale300,
}));
StyledHeader.displayName = 'StyledHeader';

export const StyledGrabber = styled<'div', {}>('div', ({ $theme }) => ({
  width: '100%',
  paddingRight: 'auto',
  paddingBottom: '12px',
  paddingLeft: 'auto',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  ':after': {
    content: '""',
    height: $theme.sizing.scale100,
    width: $theme.sizing.scale1200,
    background: $theme.colors.borderOpaque,
    borderRadius: '100px',
    margin: '0 auto',
  },
}));
StyledGrabber.displayName = 'StyledGrabber';

export const StyledHeaderGrid = styled<
  'div',
  { $hasLeadingAction: boolean; $hasTrailingAction: boolean }
>('div', ({ $theme, $hasLeadingAction, $hasTrailingAction }) => {
  const hasActionButton = $hasLeadingAction || $hasTrailingAction;
  return {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center',
    paddingRight: hasActionButton ? $theme.sizing.scale300 : $theme.sizing.scale600,
    paddingLeft: hasActionButton ? $theme.sizing.scale300 : $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale200,
    ...($theme.direction === 'rtl' ? { direction: 'rtl' } : {}),
  };
});
StyledHeaderGrid.displayName = 'StyledHeaderGrid';

export const StyledEmptyDiv = styled<'div', {}>('div', ({ $theme }) => ({
  height: $theme.sizing.scale1200,
  width: $theme.sizing.scale1200,
}));
StyledEmptyDiv.displayName = 'StyledEmptyDiv';

export const StyledHeaderTextContainer = styled<
  'div',
  { $draggable: boolean; $hasTitle: boolean; $hasDescription: boolean }
>('div', ({ $draggable, $hasTitle, $hasDescription, $theme }) => {
  const height =
    $hasTitle && $hasDescription
      ? $theme.sizing.scale1400
      : $hasTitle
      ? $theme.sizing.scale1200
      : $hasDescription
      ? $theme.sizing.scale900
      : $theme.sizing.scale800;
  return {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: $draggable ? `calc(${height} - 4px)` : height,
    maxWidth: '100%',
    overflow: 'hidden',
    gridColumn: '2 / 3',
  };
});
StyledHeaderTextContainer.displayName = 'StyledHeaderTextContainer';

export const StyledTitle = styled<'div', {}>('div', ({ $theme }) => ({
  color: $theme.colors.contentPrimary,
  maxWidth: 'inherit',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  ...$theme.typography.LabelLarge,
}));
StyledTitle.displayName = 'StyledTitle';

export const StyledDescription = styled<'div', {}>('div', ({ $theme }) => ({
  color: $theme.colors.contentSecondary,
  display: '-webkit-box',
  '-webkit-line-clamp': 2,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  ...$theme.typography.ParagraphMedium,
}));
StyledDescription.displayName = 'StyledDescription';

export const StyledDivider = withStyle(StyledDividerBase, {
  width: '100%',
  marginTop: 0,
  marginBottom: 0,
});
StyledDivider.displayName = 'StyledDivider';

export const StyledBody = styled<'div', {}>('div', ({ $theme }) => ({
  height: '100%',
  overflow: 'auto',
  color: $theme.colors.contentPrimary,
}));
StyledBody.displayName = 'StyledBody';
