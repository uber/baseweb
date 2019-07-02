/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {List, AutoSizer} from 'react-virtualized';

import defaultProps from './default-props.js';
import {
  StyledFlag,
  StyledCountrySelectDropdownContainer as DefaultContainer,
  StyledCountrySelectDropdownListItem as DefaultListItem,
  StyledCountrySelectDropdownFlagColumn as DefaultFlagColumn,
  StyledCountrySelectDropdownNameColumn as DefaultNameColumn,
  StyledCountrySelectDropdownDialcodeColumn as DefaultDialcodeColumn,
} from './styled-components.js';
import {getOverrides} from '../helpers/overrides.js';

import type {CountrySelectDropdownPropsT} from './types.js';

CountrySelectDropdown.defaultProps = {
  maxDropdownHeight: defaultProps.maxDropdownHeight,
  overrides: {},
};

function CountrySelectDropdown(
  props: CountrySelectDropdownPropsT & {forwardedRef: React.ElementRef<*>},
) {
  const {
    children,
    forwardedRef,
    country,
    overrides,
    maxDropdownHeight,
    mapIsoToLabel,
  } = props;
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
  const scrollIndex = Math.min(
    children.findIndex(opt => opt.props.item.id === country.id) + 5,
    children.length - 1,
  );
  return (
    <Container
      ref={forwardedRef}
      $height={maxDropdownHeight}
      {...containerProps}
    >
      <AutoSizer>
        {({height, width}) => {
          return (
            <List
              role="listbox"
              height={height}
              width={width}
              rowCount={children.length}
              rowHeight={42}
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
    </Container>
  );
}

export default React.forwardRef<
  CountrySelectDropdownPropsT,
  typeof CountrySelectDropdown,
>((props, ref) => <CountrySelectDropdown {...props} forwardedRef={ref} />);
