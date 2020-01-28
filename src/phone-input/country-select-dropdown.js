/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {List, AutoSizer} from 'react-virtualized';
import defaultProps from './default-props.js';
import {
  StyledFlagContainer,
  StyledCountrySelectDropdownContainer as DefaultContainer,
  StyledCountrySelectDropdownListItem as DefaultListItem,
  StyledCountrySelectDropdownFlagColumn as DefaultFlagColumn,
  StyledCountrySelectDropdownNameColumn as DefaultNameColumn,
  StyledCountrySelectDropdownDialcodeColumn as DefaultDialcodeColumn,
} from './styled-components.js';
import {LocaleContext} from '../locale/index.js';
import {StyledEmptyState} from '../menu/styled-components.js';
import {getOverrides} from '../helpers/overrides.js';
import {iso2FlagEmoji} from './utils.js';

import type {CountrySelectDropdownPropsT} from './types.js';
import type {LocaleT} from '../locale/types.js';

CountrySelectDropdown.defaultProps = {
  maxDropdownHeight: defaultProps.maxDropdownHeight,
  overrides: {},
};

function CountrySelectDropdown(
  props: CountrySelectDropdownPropsT & {$forwardedRef: React.ElementRef<*>},
) {
  const {
    $country: country,
    $forwardedRef: forwardedRef,
    $maxDropdownHeight: maxDropdownHeight,
    $mapIsoToLabel: mapIsoToLabel,
    $noResultsMsg: noResultsMsg,
    $overrides: overrides,
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
  const [FlagContainer, flagContainerProps] = getOverrides(
    overrides.FlagContainer,
    StyledFlagContainer,
  );
  const [NameColumn, nameColumnProps] = getOverrides(
    overrides.CountrySelectDropdownNameColumn,
    DefaultNameColumn,
  );
  const [Dialcode, dialcodeProps] = getOverrides(
    overrides.CountrySelectDropdownDialcodeColumn,
    DefaultDialcodeColumn,
  );
  const [EmptyState, emptyStateProps] = getOverrides(
    overrides.EmptyState,
    StyledEmptyState,
  );

  // Handle no results, likely from filtering
  if (!props.children.length) {
    return (
      <LocaleContext.Consumer>
        {(locale: LocaleT) => (
          <EmptyState {...emptyStateProps}>
            {noResultsMsg || locale.menu.noResultsMsg}
          </EmptyState>
        )}
      </LocaleContext.Consumer>
    );
  }

  const children = React.Children.toArray(props.children);
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
                const {item, resetMenu, getItemLabel, ...rest} = children[
                  index
                ].props;
                const {id: iso, label, dialCode} = item;
                return (
                  <ListItem
                    key={key}
                    style={style}
                    item={item}
                    {...rest}
                    {...listItemProps}
                    data-iso={iso}
                  >
                    <FlagColumn {...flagColumnProps}>
                      <FlagContainer
                        $iso={iso}
                        data-iso={iso}
                        {...flagContainerProps}
                      >
                        {iso2FlagEmoji(iso)}
                      </FlagContainer>
                    </FlagColumn>
                    <NameColumn {...nameColumnProps}>
                      {mapIsoToLabel ? mapIsoToLabel(iso) : label}
                    </NameColumn>
                    <Dialcode {...dialcodeProps}>{dialCode}</Dialcode>
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
>((props, ref) => <CountrySelectDropdown {...props} $forwardedRef={ref} />);
