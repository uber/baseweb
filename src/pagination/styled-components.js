/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles';
import {StyledList} from '../menu';
import {StyledBaseButton} from '../button';
import {StyledInput} from '../input';
import {StyledTag} from '../select';

export const Root = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const MaxLabel = styled('span', ({$theme}) => ({
  ...$theme.typography.font300,
  marginLeft: $theme.sizing.scale300,
  marginRight: $theme.sizing.scale600,
}));

export const DropdownContainer = styled('div', ({$theme}) => ({
  position: 'relative',
  cursor: 'pointer',
  marginLeft: $theme.sizing.scale600,
  marginRight: $theme.sizing.scale300,
  minWidth: `calc(${$theme.sizing.scale1600} + ${$theme.sizing.scale400})`,
}));

export const DropdownMenu = styled(StyledList, ({$theme}) => ({
  position: 'absolute',
  overflow: 'auto',
  maxHeight: '200px',
  top: 'auto',
  marginTop: $theme.sizing.scale300,
  left: 0,
  right: 0,
}));

export const DropdownButton = styled(StyledBaseButton, ({$theme}) => ({
  color: $theme.colors.black,
}));

// The following are meant to be used internallt and not exported to external customers

export const SelectInput = styled(StyledInput, {display: 'none'});
export const SelectTag = styled(StyledTag, ({$theme}) => ({
  ...$theme.typography.font300,
  color: $theme.colors.black,
  // Hacking to get around not being able to override borders
  paddingTop: `calc(${$theme.sizing.scale300} - 1px)`,
  paddingBottom: `calc(${$theme.sizing.scale300} - 1px)`,
  paddingLeft: `calc(${$theme.sizing.scale600} - 1px)`,
  paddingRight: `calc(${$theme.sizing.scale600} - 1px)`,
}));
