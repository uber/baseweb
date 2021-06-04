/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {SIZE} from './constants.js';
import {styled, withStyle, withWrapper} from '../styles/index.js';
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

// The root element of the PhoneInputNext
export const StyledPhoneInputRoot = styled('div', {display: 'flex'});

export const StyledFlagContainer = styled<SizeStyleProps>(
  'span',
  ({$size = SIZE.default, $theme: {sizing}}) => {
    const sizeToFont = {
      [SIZE.mini]: sizing.scale700,
      [SIZE.compact]: sizing.scale800,
      [SIZE.default]: sizing.scale900,
      [SIZE.large]: sizing.scale1000,
    };
    return {
      fontSize: sizeToFont[$size],
    };
  },
);

// An override component for the Select's Root styled element
export const StyledRoot = withStyle<typeof SelectStyledRoot, SizeStyleProps>(
  SelectStyledRoot,
  props => {
    // hard coded widths for the flag dropdown anchor
    const sizeToWidth = {
      [SIZE.mini]: '50px',
      [SIZE.compact]: '60px',
      [SIZE.default]: '70px',
      [SIZE.large]: '80px',
    };

    return {
      width: sizeToWidth[props.$size || SIZE.default],
      display: 'inline-block',
    };
  },
);

export const StyledDialCode = styled<{}>(
  'div',
  ({$theme: {direction, sizing}}) => {
    const marginDir = direction === 'rtl' ? 'marginRight' : 'marginLeft';
    return {
      [marginDir]: sizing.scale100,
      display: 'flex',
      alignItems: 'center',
    };
  },
);

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

export const StyledCountrySelectDropdownListItem = withWrapper(
  StyledCountrySelectDropdownListItemElement,
  Styled =>
    function StyledCountrySelectDropdownListItem({item, ...restProps}) {
      return <Styled {...restProps} />;
    },
);

export const StyledCountrySelectDropdownFlagColumn = styled<{}>(
  'div',
  ({$theme: {direction, sizing}}) => {
    const paddingDir = direction === 'rtl' ? 'paddingRight' : 'paddingLeft';
    return {
      [paddingDir]: sizing.scale600,
      display: 'flex',
      alignItems: 'center',
    };
  },
);

export const StyledCountrySelectDropdownNameColumn = styled<{}>(
  'div',
  ({$theme: {direction, sizing}}) => {
    const paddingDir = direction === 'rtl' ? 'paddingRight' : 'paddingLeft';
    return {
      [paddingDir]: sizing.scale600,
    };
  },
);

export const StyledCountrySelectDropdownDialcodeColumn = styled<{}>(
  'div',
  ({$theme: {direction, sizing}}) => {
    const paddingDir = direction === 'rtl' ? 'paddingLeft' : 'paddingRight';
    const marginDir = direction === 'rtl' ? 'marginRight' : 'marginLeft';
    return {
      [paddingDir]: sizing.scale600,
      [marginDir]: 'auto',
    };
  },
);
