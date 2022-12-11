/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { SIZE } from './constants';
import { styled, withStyle, withWrapper } from '../styles';
import { StyledList } from '../menu';
import { StyledDropdownListItem, StyledRoot as SelectStyledRoot } from '../select';
import defaultProps from '../select/default-props';
import type { Size } from './types';

type SizeStyleProps = {
  $size?: Size;
};

type HeightStyleProps = {
  $height: string;
};

// The root element of the PhoneInputNext
export const StyledPhoneInputRoot = styled('div', { display: 'flex' });

StyledPhoneInputRoot.displayName = 'StyledPhoneInputRoot';

export const StyledFlagContainer = styled<'span', SizeStyleProps>(
  'span',
  ({ $size = SIZE.default, $theme: { sizing } }) => {
    const sizeToFont = {
      [SIZE.mini]: sizing.scale700,
      [SIZE.compact]: sizing.scale800,
      [SIZE.default]: sizing.scale900,
      [SIZE.large]: sizing.scale1000,
    };
    return {
      fontSize: sizeToFont[$size],
    };
  }
);

StyledFlagContainer.displayName = 'StyledFlagContainer';

// An override component for the Select's Root styled element
export const StyledRoot = withStyle<typeof SelectStyledRoot, SizeStyleProps>(
  SelectStyledRoot,
  (props) => {
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
  }
);

StyledRoot.displayName = 'StyledRoot';

export const StyledDialCode = styled('div', ({ $theme: { direction, sizing } }) => {
  const marginDir: string = direction === 'rtl' ? 'marginRight' : 'marginLeft';
  return {
    [marginDir]: sizing.scale100,
    display: 'flex',
    alignItems: 'center',
  };
});

StyledDialCode.displayName = 'StyledDialCode';

export const StyledCountrySelectContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

StyledCountrySelectContainer.displayName = 'StyledCountrySelectContainer';

export const StyledCountrySelectDropdownContainer = withStyle<typeof StyledList, HeightStyleProps>(
  StyledList,
  (props) => {
    const { $height = defaultProps.maxDropdownHeight } = props;
    return {
      height: $height,
      paddingTop: 0,
      paddingBottom: 0,
    };
  }
);

StyledCountrySelectDropdownContainer.displayName = 'StyledCountrySelectDropdownContainer';

export const StyledCountrySelectDropdownListItemElement = withStyle<typeof StyledDropdownListItem>(
  StyledDropdownListItem,
  {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    display: 'flex',
    alignItems: 'center',
    height: '42px',
  }
);

StyledCountrySelectDropdownListItemElement.displayName =
  'StyledCountrySelectDropdownListItemElement';

export const StyledCountrySelectDropdownListItem = withWrapper<
  typeof StyledCountrySelectDropdownListItemElement,
  // @ts-ignore
  { item? }
>(
  StyledCountrySelectDropdownListItemElement,
  (Styled) =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function StyledCountrySelectDropdownListItem({ item, ...restProps }) {
      return <Styled {...restProps} />;
    }
);

export const StyledCountrySelectDropdownFlagColumn = styled(
  'div',
  ({ $theme: { direction, sizing } }) => {
    const paddingDir: string = direction === 'rtl' ? 'paddingRight' : 'paddingLeft';
    return {
      [paddingDir]: sizing.scale600,
      display: 'flex',
      alignItems: 'center',
    };
  }
);

StyledCountrySelectDropdownFlagColumn.displayName = 'StyledCountrySelectDropdownFlagColumn';

export const StyledCountrySelectDropdownNameColumn = styled(
  'div',
  ({ $theme: { direction, sizing } }) => {
    const paddingDir: string = direction === 'rtl' ? 'paddingRight' : 'paddingLeft';
    return {
      [paddingDir]: sizing.scale600,
    };
  }
);

StyledCountrySelectDropdownNameColumn.displayName = 'StyledCountrySelectDropdownNameColumn';

export const StyledCountrySelectDropdownDialcodeColumn = styled(
  'div',
  ({ $theme: { direction, sizing } }) => {
    const paddingDir: string = direction === 'rtl' ? 'paddingLeft' : 'paddingRight';
    const marginDir: string = direction === 'rtl' ? 'marginRight' : 'marginLeft';
    return {
      [paddingDir]: sizing.scale600,
      [marginDir]: 'auto',
    };
  }
);
StyledCountrySelectDropdownDialcodeColumn.displayName = 'StyledCountrySelectDropdownDialcodeColumn';
