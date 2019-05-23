/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index.js';
import {StyledList} from '../menu/index.js';
import {StyledDropdownListItem} from '../select/index.js';

export const StyledCountrySelectContainer = styled(
  StyledList,
  ({$height = '400px'}) => {
    return {height: $height};
  },
);

export const StyledCountrySelectListItem = styled(StyledDropdownListItem, {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  display: 'flex',
  alignItems: 'center',
});

export const StyledCountrySelectFlagContainer = styled(
  'div',
  ({$theme: {sizing}}) => {
    return {
      paddingLeft: sizing.scale600,
      display: 'flex',
      alignItems: 'center',
    };
  },
);

export const StyledCountrySelectNameContainer = styled(
  'div',
  ({$theme: {sizing}}) => {
    return {
      paddingLeft: sizing.scale600,
    };
  },
);

export const StyledCountrySelectIsoContainer = styled(
  'div',
  ({$theme: {sizing}}) => {
    return {
      paddingRight: sizing.scale600,
      marginLeft: 'auto',
    };
  },
);
