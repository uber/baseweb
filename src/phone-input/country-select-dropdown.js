/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {List, AutoSizer} from 'react-virtualized';

import {LIST_ROW_HEIGHT} from './constants.js';
import defaultProps from './default-props.js';
import {
  StyledFlag,
  StyledCountrySelectDropdownContainer as DefaultContainer,
  StyledCountrySelectDropdownListItem as DefaultListItem,
  StyledCountrySelectDropdownFlagColumn as DefaultFlagColumn,
  StyledCountrySelectDropdownNameColumn as DefaultNameColumn,
  StyledCountrySelectDropdownDialcodeColumn as DefaultDialcodeColumn,
  StyledPopoverContentContainer as DefaultPopoverContentContainer,
} from './styled-components.js';
import {default as DefaultFilterInput} from './filter-input.js';
import {getOverrides} from '../helpers/overrides.js';

import type {CountrySelectDropdownPropsT} from './types.js';

function calculateDropDownHeight(maxDropdownHeight, rowCount, rowHeight) {
  //set height to `auto` when we don't have any options
  if (!rowCount) {
    return `auto`;
  }
  const height = parseInt(maxDropdownHeight);
  const actualHeight = rowCount * rowHeight;
  return Math.min(actualHeight, height) + 'px';
}

function calcualteInitialScrollIndex(
  children,
  country,
  maxDropdownHeight,
  rowHeight,
) {
  const shiftLen = Math.round(parseInt(maxDropdownHeight) / (rowHeight * 2));
  return Array.isArray(children)
    ? Math.min(
        children.findIndex(opt => opt.props.item.id === country.id) + shiftLen,
        children.length - 1,
      )
    : 0;
}

CountrySelectDropdown.defaultProps = {
  maxDropdownHeight: defaultProps.maxDropdownHeight,
  overrides: {},
};

function CountrySelectDropdown(
  props: CountrySelectDropdownPropsT & {forwardedRef: React.ElementRef<*>},
) {
  const {
    forwardedRef,
    country,
    overrides,
    maxDropdownHeight,
    mapIsoToLabel,
    onFilter,
    children,
    enableFiltering,
  } = props;
  const [scrollIndex, setScrollIndex] = React.useState(
    calcualteInitialScrollIndex(
      children,
      country,
      maxDropdownHeight,
      LIST_ROW_HEIGHT,
    ),
  );

  const [PopoverContentContainer, popoverContentContainerProps] = getOverrides(
    overrides.PopoverContentContainer,
    DefaultPopoverContentContainer,
  );
  const [Container, containerProps] = getOverrides(
    overrides.CountrySelectDropdown,
    DefaultContainer,
  );
  const [ListItem, listItemProps] = getOverrides(
    overrides.CountrySelectDropdownListItem,
    DefaultListItem,
  );
  const [FlagColumn, flagColumnProps] = getOverrides(
    overrides.CountrySelectDropdownFlagColumn,
    DefaultFlagColumn,
  );
  const [NameColumn, nameColumnProps] = getOverrides(
    overrides.CountrySelectDropdownNameColumn,
    DefaultNameColumn,
  );
  const [Dialcode, dialcodeProps] = getOverrides(
    overrides.CountrySelectDropdownDialcodeColumn,
    DefaultDialcodeColumn,
  );
  const [FilterInput, filterInputProps] = getOverrides(
    overrides.FilterInput,
    DefaultFilterInput,
  );
  return (
    <PopoverContentContainer
      ref={forwardedRef}
      {...popoverContentContainerProps}
    >
      {enableFiltering && (
        <FilterInput
          onChange={event => {
            onFilter(event);
            setScrollIndex(0);
          }}
          {...filterInputProps}
        />
      )}
      <Container
        $height={calculateDropDownHeight(
          maxDropdownHeight,
          children.length,
          LIST_ROW_HEIGHT,
        )}
        {...containerProps}
      >
        {Array.isArray(children) ? (
          <AutoSizer>
            {({height, width}) => {
              return (
                <List
                  role="listbox"
                  height={height}
                  width={width}
                  rowCount={children.length}
                  rowHeight={LIST_ROW_HEIGHT}
                  scrollToIndex={scrollIndex}
                  rowRenderer={({index, key, style}) => {
                    // resetMenu and getItemLabel should not end up on native html elements
                    const {resetMenu, getItemLabel, ...rest} = children[
                      index
                    ].props;
                    return (
                      <ListItem
                        key={key}
                        style={style}
                        {...rest}
                        {...listItemProps}
                        data-e2e="country-select-list-item"
                        data-iso={children[index].props.item.id}
                      >
                        <FlagColumn {...flagColumnProps}>
                          <StyledFlag iso={children[index].props.item.id} />
                        </FlagColumn>
                        <NameColumn {...nameColumnProps}>
                          {mapIsoToLabel
                            ? mapIsoToLabel(props.children[index].props.item.id)
                            : children[index].props.item.label}
                        </NameColumn>
                        <Dialcode {...dialcodeProps}>
                          {children[index].props.item.dialCode}
                        </Dialcode>
                      </ListItem>
                    );
                  }}
                />
              );
            }}
          </AutoSizer>
        ) : (
          children
        )}
      </Container>
    </PopoverContentContainer>
  );
}

export default React.forwardRef<
  CountrySelectDropdownPropsT,
  typeof CountrySelectDropdown,
>((props, ref) => <CountrySelectDropdown {...props} forwardedRef={ref} />);
