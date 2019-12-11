/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {LocaleContext} from '../locale/index.js';
// Components
import {
  StyledList,
  StyledEmptyState,
  StyledOptgroupHeader,
} from './styled-components.js';
import OptionList from './option-list.js';
import {getOverrides} from '../helpers/overrides.js';
// Types
import type {StatelessMenuPropsT, GroupedItemsT, ItemT} from './types.js';
import type {LocaleT} from '../locale/types.js';

function Item(props: {
  ...$Diff<StatelessMenuPropsT, {items: mixed}>,
  item: ItemT,
  index: number,
}) {
  const {getRequiredItemProps = (item, index) => ({}), overrides = {}} = props;
  const [Option, optionProps] = getOverrides(overrides.Option, OptionList);
  const {
    disabled,
    isFocused,
    isHighlighted,
    ref,
    resetMenu = () => {},
    ...restProps
  } = getRequiredItemProps(props.item, props.index);

  return (
    <Option
      key={props.index}
      item={props.item}
      overrides={props.overrides}
      resetMenu={resetMenu}
      role="option"
      $disabled={disabled}
      ref={ref}
      $isFocused={isFocused}
      $isHighlighted={isHighlighted}
      aria-selected={isHighlighted && isFocused}
      {...restProps}
      {...optionProps}
    />
  );
}

function Items(props: {...StatelessMenuPropsT, items: GroupedItemsT}) {
  const {overrides = {}} = props;
  const {items, noResultsMsg, ...restProps} = props;

  const [EmptyState, emptyStateProps] = getOverrides(
    overrides.EmptyState,
    StyledEmptyState,
  );
  const [OptgroupHeader, optgroupHeaderProps] = getOverrides(
    overrides.OptgroupHeader,
    StyledOptgroupHeader,
  );

  const optgroups = Object.keys(items);
  const isEmpty = optgroups.every(optgroup => !items[optgroup].length);

  if (isEmpty) {
    return <EmptyState {...emptyStateProps}>{noResultsMsg}</EmptyState>;
  }

  const [elements] = optgroups.reduce(
    ([els, itemIndex], optgroup) => {
      if (optgroup !== '__ungrouped') {
        els.push(
          <OptgroupHeader key={optgroup} {...optgroupHeaderProps}>
            {optgroup}
          </OptgroupHeader>,
        );
      }
      const groupItems = items[optgroup].map((item, index) => {
        itemIndex = itemIndex + 1;
        return (
          <Item
            key={`${optgroup}-${index}`}
            {...restProps}
            item={item}
            index={itemIndex}
          />
        );
      });
      return [els.concat(groupItems), itemIndex];
    },
    [[], -1],
  );

  return elements;
}

export default function Menu(props: StatelessMenuPropsT) {
  const {items, noResultsMsg, ...restProps} = props;
  const {
    overrides = {},
    rootRef = React.createRef(),
    focusMenu = () => {},
    unfocusMenu = () => {},
  } = props;

  const [List, listProps] = getOverrides(overrides.List, StyledList);
  const groupedItems = Array.isArray(items) ? {__ungrouped: items} : items;

  return (
    <LocaleContext.Consumer>
      {(locale: LocaleT) => (
        <List
          aria-activedescendant={props.activedescendantId || null}
          role="listbox"
          ref={rootRef}
          onMouseEnter={focusMenu}
          onMouseOver={focusMenu}
          onFocus={focusMenu}
          onBlur={unfocusMenu}
          tabIndex={0}
          data-baseweb="menu"
          {...listProps}
        >
          <Items
            {...restProps}
            items={groupedItems}
            noResultsMsg={noResultsMsg || locale.menu.noResultsMsg}
          />
        </List>
      )}
    </LocaleContext.Consumer>
  );
}
