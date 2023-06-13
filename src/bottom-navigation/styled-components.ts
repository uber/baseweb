/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';

const SELECTOR_LIST_HEIGHT = '64px';

export const StyledRoot = styled('div', {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});
StyledRoot.displayName = 'StyledRoot';

export const StyledSelectorList = styled<'div', {}>('div', ({ $theme }) => {
  return {
    container: 'nav-item-list / inline-size',
    boxSizing: 'border-box',
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: '1fr',
    gap: $theme.sizing.scale300,
    width: '100%',
    height: SELECTOR_LIST_HEIGHT,
    paddingTop: $theme.sizing.scale500,
    paddingBottom: $theme.sizing.scale500,
    paddingLeft: $theme.sizing.scale300,
    paddingRight: $theme.sizing.scale300,
    borderTop: `${$theme.sizing.scale0} solid ${$theme.colors.borderOpaque}`,
    backgroundColor: $theme.colors.backgroundPrimary,
  };
});
StyledSelectorList.displayName = 'StyledSelectorList';

export const StyledOverflowPanel = styled('div', {
  height: `calc(100% - ${SELECTOR_LIST_HEIGHT})`,
  overflow: 'auto',
});
StyledOverflowPanel.displayName = 'StyledOverflowPanel';

export const StyledOverflowPanelList = styled('ul', {
  paddingLeft: 0,
  paddingRight: 0,
});
StyledOverflowPanelList.displayName = 'StyledOverflowPanelList';

export const StyledTitle = styled<'div', { $isActive: boolean }>(
  'div',
  ({ $theme, $isActive }) => ({
    ...$theme.typography.LabelXSmall,
    color: $isActive ? $theme.colors.contentPrimary : $theme.colors.contentTertiary,
  })
);
StyledTitle.displayName = 'StyledTitle';

export const StyledSelector = styled<'button', {}>('button', ({ $theme }) => ({
  '@container nav-item-list (min-width: 600px)': {
    flexDirection: 'row',
    gap: $theme.sizing.scale500,
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: $theme.sizing.scale0,
  // button style reset
  borderRadius: 0,
  textAlign: 'inherit',
  background: 'none',
  boxShadow: 'none',
  padding: 0,
  cursor: 'pointer',
  border: 'none',
  color: 'inherit',
  font: 'inherit',
}));
StyledSelector.displayName = 'StyledSelector';

export const StyledPanel = styled('div', {
  height: `calc(100% - ${SELECTOR_LIST_HEIGHT})`,
  overflow: 'auto',
});
StyledPanel.displayName = 'StyledPanel';
