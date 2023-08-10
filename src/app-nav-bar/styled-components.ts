/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled, withStyle } from '../styles';
import { getMediaQueryPageMargins, getMinimumPageMargins } from '../helpers/responsive-helpers';
import { StyledListItem } from '../menu';
import { KIND } from './constants';

const StyledButton = styled<
  'button',
  {
    $isFocusVisible: boolean;
  }
>('button', ({ $theme, $isFocusVisible }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  color: $theme.colors.contentPrimary,
  borderLeftWidth: 0,
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
  paddingTop: '0',
  paddingBottom: '0',
  paddingLeft: '0',
  paddingRight: '0',
  marginLeft: 0,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  outline: $isFocusVisible ? `3px solid ${$theme.colors.borderAccent}` : 'none',
  outlineOffset: '-3px',
  WebkitAppearance: 'none',
  cursor: 'pointer',
}));
StyledButton.displayName = 'StyledButton';

export const StyledRoot = styled('div', (props) => {
  const { $theme } = props;
  return {
    ...$theme.typography.font300,
    ...getMinimumPageMargins($theme.grid.margins),
    ...getMediaQueryPageMargins($theme),
    boxSizing: 'border-box',
    backgroundColor: $theme.colors.backgroundPrimary,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: `${$theme.colors.borderOpaque}`,
  };
});
StyledRoot.displayName = 'StyledRoot';

export const StyledSubnavContainer = styled('div', {});
StyledSubnavContainer.displayName = 'StyledSubnavContainer';

export const StyledSpacing = styled('div', (props) => {
  const { $theme } = props;
  return {
    boxSizing: 'border-box',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: $theme.sizing.scale400,
    paddingBottom: $theme.sizing.scale400,
    [$theme.mediaQuery.medium]: {
      paddingTop: $theme.sizing.scale700,
      paddingBottom: $theme.sizing.scale700,
    },
  };
});
StyledSpacing.displayName = 'StyledSpacing';

export const StyledAppName = styled('div', ({ $theme }) => ({
  ...$theme.typography.font550,
  color: $theme.colors.contentPrimary,
  textDecoration: 'none',
  [$theme.mediaQuery.medium]: {
    ...$theme.typography.font650,
  },
}));
StyledAppName.displayName = 'StyledAppName';

export const StyledSideMenuButton = withStyle<typeof StyledButton, {}>(
  StyledButton,
  ({ $theme }) => ({
    ...($theme.direction === 'rtl'
      ? { marginLeft: $theme.sizing.scale600 }
      : { marginRight: $theme.sizing.scale600 }),
    paddingTop: $theme.sizing.scale100,
    paddingBottom: $theme.sizing.scale100,
    paddingLeft: $theme.sizing.scale100,
    paddingRight: $theme.sizing.scale100,
  })
);
StyledSideMenuButton.displayName = 'StyledSideMenuButton';

export const StyledPrimaryMenuContainer = styled('div', ({ $theme }) => {
  return {
    boxSizing: 'border-box',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    paddingInlineEnd: $theme.sizing.scale1000,
  };
});
StyledPrimaryMenuContainer.displayName = 'StyledPrimaryMenuContainer';

export const StyledMainMenuItem = styled<
  'div',
  {
    $active?: boolean;
    $isFocusVisible: boolean;
    $kind: (typeof KIND)[keyof typeof KIND];
  }
>('div', (props) => {
  const {
    $active,
    $isFocusVisible,
    $kind,
    $theme: { colors, sizing, direction },
  } = props;
  return {
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    color: $active ? colors.contentPrimary : colors.contentTertiary,
    marginLeft: sizing.scale700,
    marginRight: sizing.scale700,
    paddingTop: $kind === KIND.secondary ? sizing.scale750 : '0',
    paddingBottom: $kind === KIND.secondary ? sizing.scale750 : '0',
    outline: $isFocusVisible ? `3px solid ${colors.borderAccent}` : 'none',
    outlineOffset: '-3px',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: $active && !$isFocusVisible ? colors.borderSelected : 'transparent',
    cursor: $active ? 'default' : 'pointer',
    whiteSpace: $kind === KIND.secondary ? 'nowrap' : 'initial',
    ':first-child': {
      ...(direction === 'rtl' ? { marginRight: '0' } : { marginLeft: '0' }),
    },
    ':last-child': {
      ...(direction === 'rtl' ? { marginLeft: '0' } : { marginRight: '0' }),
    },
    ':hover': {
      color: colors.contentPrimary,
    },
  };
});
StyledMainMenuItem.displayName = 'StyledMainMenuItem';

export const StyledSecondaryMenuContainer = styled('div', ({ $theme }) => {
  return {
    boxSizing: 'border-box',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    margin: 'auto',
    maxWidth: `${$theme.grid.maxWidth}px`,
    alignItems: 'stretch',
    overflow: 'auto',
  };
});
StyledSecondaryMenuContainer.displayName = 'StyledSecondaryMenuContainer';

export const StyledUserMenuButton = StyledButton;
StyledUserMenuButton.displayName = 'StyledUserMenuButton';

export const StyledUserMenuProfileListItem = withStyle<typeof StyledListItem, {}>(
  StyledListItem,
  ({ $theme }) => ({
    paddingTop: '0',
    paddingBottom: '0',
    ...($theme.direction === 'rtl' ? { paddingLeft: '0' } : { paddingRight: '0' }),
  })
);
StyledUserMenuProfileListItem.displayName = 'StyledUserMenuProfileListItem';

export const StyledUserProfileTileContainer = styled('div', ({ $theme }) => {
  return {
    boxSizing: 'border-box',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    paddingTop: $theme.sizing.scale650,
    paddingBottom: $theme.sizing.scale650,
  };
});
StyledUserProfileTileContainer.displayName = 'StyledUserProfileTileContainer';

export const StyledUserProfilePictureContainer = styled('div', ({ $theme }) => {
  return {
    ...($theme.direction === 'rtl'
      ? { marginLeft: $theme.sizing.scale600 }
      : { marginRight: $theme.sizing.scale600 }),
  };
});
StyledUserProfilePictureContainer.displayName = 'StyledUserProfilePictureContainer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledUserProfileInfoContainer = styled('div', ({ $theme }) => {
  return {
    boxSizing: 'border-box',
    alignSelf: 'center',
  };
});
StyledUserProfileInfoContainer.displayName = 'StyledUserProfileInfoContainer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledDesktopMenuContainer = styled('div', ({ $theme }) => {
  return {};
});
StyledDesktopMenuContainer.displayName = 'StyledDesktopMenuContainer';

export const StyledDesktopMenu = styled('div', ({ $theme }) => {
  return {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    margin: 'auto',
    maxWidth: `${$theme.grid.maxWidth}px`,
    paddingBlockStart: '18px',
    paddingBlockEnd: '18px',
  };
});
StyledDesktopMenu.displayName = 'StyledDesktopMenu';
