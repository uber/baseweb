/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {withStyle} from 'styletron-react';

import Flag from './flag.js';
import {DEFAULT_MAX_DROPDOWN_HEIGHT, SIZE} from './constants.js';
import {styled} from '../styles/index.js';
import {StyledList} from '../menu/index.js';
import {
  StyledDropdownListItem,
  StyledRoot as SelectStyledRoot,
} from '../select/index.js';

export const StyledFlag = styled(
  Flag,
  ({$size = SIZE.default, $theme: {sizing}}) => {
    const sizeToWidth = {
      [SIZE.compact]: sizing.scale800,
      [SIZE.default]: sizing.scale900,
      [SIZE.large]: sizing.scale1000,
    };
    return {
      width: sizeToWidth[$size],
    };
  },
);

export const StyledRoot = withStyle(
  SelectStyledRoot,
  ({size = SIZE.default, $theme: {sizing}}) => {
    // hard coded widths for the flag dropdown anchor
    const sizeToWidth = {
      [SIZE.compact]: '60px',
      [SIZE.default]: '70px',
      [SIZE.large]: '80px',
    };
    return {
      width: sizeToWidth[size],
    };
  },
);

export const StyledDialCode = styled('div', ({$theme: {sizing}}) => ({
  marginLeft: sizing.scale100,
}));

export const StyledCountrySelectDropdownContainer = withStyle(
  StyledList,
  ({$height = DEFAULT_MAX_DROPDOWN_HEIGHT}) => {
    return {
      height: $height,
      paddingTop: 0,
      paddingBottom: 0,
    };
  },
);

export const StyledCountrySelectDropdownListItem = withStyle(
  StyledDropdownListItem,
  {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    display: 'flex',
    alignItems: 'center',
  },
);

export const StyledCountrySelectDropdownFlagColumn = styled(
  'div',
  ({$theme: {sizing}}) => {
    return {
      paddingLeft: sizing.scale600,
      display: 'flex',
      alignItems: 'center',
    };
  },
);

export const StyledCountrySelectDropdownNameColumn = styled(
  'div',
  ({$theme: {sizing}}) => {
    return {
      paddingLeft: sizing.scale600,
    };
  },
);

export const StyledCountrySelectDropdownDialcodeColumn = styled(
  'div',
  ({$theme: {sizing}}) => {
    return {
      paddingRight: sizing.scale600,
      marginLeft: 'auto',
    };
  },
);
