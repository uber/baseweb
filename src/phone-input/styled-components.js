/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {SIZE} from './constants.js';
import {styled, withStyle} from '../styles/index.js';
import {StyledList} from '../menu/index.js';
import {
  StyledDropdownListItem,
  StyledRoot as SelectStyledRoot,
} from '../select/index.js';
import defaultProps from '../select/default-props.js';
import type {SizeT} from './types.js';

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

export const StyledCountrySelectDropdownListItem = withStyle<
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
