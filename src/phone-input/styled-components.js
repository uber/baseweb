/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {DEFAULT_DROPDOWN_HEIGHT} from './constants.js';
import {styled} from '../styles/index.js';
import {StyledList} from '../menu/index.js';
import {StyledDropdownListItem} from '../select/index.js';

export const StyledCountrySelectDropdownContainer = styled(
  StyledList,
  ({$height = DEFAULT_DROPDOWN_HEIGHT}) => {
    return {height: $height};
  },
);

export const StyledCountrySelectDropdownListItem = styled(
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
