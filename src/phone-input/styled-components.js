/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {SIZE} from './constants.js';
import {styled, withStyle} from '../styles/index.js';
import {StyledList} from '../menu/index.js';
import {
  StyledDropdownListItem,
  StyledRoot as SelectStyledRoot,
} from '../select/index.js';
import defaultProps from '../select/default-props.js';
import type {CountryT, SizeT} from './types.js';
import type {StyletronComponent} from '../styles/styled.js';

type SizeStyleProps = {
  $size?: SizeT,
};
type HeightStyleProps = {$height: string};

export const StyledFlagContainer = styled<SizeStyleProps>(
  'span',
  ({$size = SIZE.default, $theme: {sizing}}) => {
    const sizeToFont = {
      [SIZE.compact]: sizing.scale800,
      [SIZE.default]: sizing.scale900,
      [SIZE.large]: sizing.scale1000,
    };
    return {
      fontSize: sizeToFont[$size],
    };
  },
);

export const StyledRoot = withStyle<typeof SelectStyledRoot, SizeStyleProps>(
  SelectStyledRoot,
  props => {
    // hard coded widths for the flag dropdown anchor
    const sizeToWidth = {
      [SIZE.compact]: '60px',
      [SIZE.default]: '70px',
      [SIZE.large]: '80px',
    };

    return {
      width: sizeToWidth[props.$size || SIZE.default],
    };
  },
);

export const StyledDialCode = styled<{}>('div', ({$theme: {sizing}}) => ({
  marginLeft: sizing.scale100,
}));

export const StyledCountrySelectContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const StyledCountrySelectDropdownContainer = withStyle<
  typeof StyledList,
  HeightStyleProps,
>(StyledList, props => {
  const {$height = defaultProps.maxDropdownHeight} = props;
  return {
    height: $height,
    paddingTop: 0,
    paddingBottom: 0,
  };
});

export const StyledCountrySelectDropdownListItemElement = withStyle<
  typeof StyledDropdownListItem,
>(StyledDropdownListItem, {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  display: 'flex',
  alignItems: 'center',
  height: '42px',
});

export const StyledCountrySelectDropdownListItem = ((React.forwardRef<
  {item: CountryT, ...$Exact<typeof StyledDropdownListItem>},
  // eslint-disable-next-line flowtype/no-weak-types
  any,
>(
  ({item, ...restProps}, ref) => (
    <StyledCountrySelectDropdownListItemElement ref={ref} {...restProps} />
  ),
  // eslint-disable-next-line flowtype/no-weak-types
): any): StyletronComponent<typeof StyledDropdownListItem>);
StyledCountrySelectDropdownListItem.__STYLETRON__ =
  StyledCountrySelectDropdownListItemElement.__STYLETRON__;
StyledCountrySelectDropdownListItem.displayName =
  'StyledCountrySelectDropdownListItem';

export const StyledCountrySelectDropdownFlagColumn = styled<{}>(
  'div',
  ({$theme: {sizing}}) => {
    return {
      paddingLeft: sizing.scale600,
      display: 'flex',
      alignItems: 'center',
    };
  },
);

export const StyledCountrySelectDropdownNameColumn = styled<{}>(
  'div',
  ({$theme: {sizing}}) => {
    return {
      paddingLeft: sizing.scale600,
    };
  },
);

export const StyledCountrySelectDropdownDialcodeColumn = styled<{}>(
  'div',
  ({$theme: {sizing}}) => {
    return {
      paddingRight: sizing.scale600,
      marginLeft: 'auto',
    };
  },
);
