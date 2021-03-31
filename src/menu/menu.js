/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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
import type {StatelessMenuPropsT} from './types.js';
import type {LocaleT} from '../locale/types.js';

import {isFocusVisible, forkFocus, forkBlur} from '../utils/focusVisible.js';

export default function Menu(props: StatelessMenuPropsT) {
  const {
    overrides = {},
    rootRef = React.createRef(),
    focusMenu = () => {},
    unfocusMenu = () => {},
    handleMouseLeave = () => {},
    handleKeyDown = (event: KeyboardEvent) => {},
    renderAll = false,
  } = props;

  const [focusVisible, setFocusVisible] = React.useState(false);
  const handleFocus = (event: SyntheticEvent<>) => {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
  };

  const handleBlur = (event: SyntheticEvent<>) => {
    if (focusVisible !== false) {
      setFocusVisible(false);
    }
  };

  const [List, listProps] = getOverrides(overrides.List, StyledList);
  const [Option, optionProps] = getOverrides(overrides.Option, OptionList);
  const [EmptyState, emptyStateProps] = getOverrides(
    overrides.EmptyState,
    StyledEmptyState,
  );
  const [OptgroupHeader, optgroupHeaderProps] = getOverrides(
    overrides.OptgroupHeader,
    StyledOptgroupHeader,
  );

  const groupedItems = Array.isArray(props.items)
    ? {__ungrouped: props.items}
    : props.items;
  const optgroups = Object.keys(groupedItems);
  const [elements] = optgroups.reduce(
    ([els, itemIndex], optgroup) => {
      if (optgroup !== '__ungrouped') {
        els.push(
          <OptgroupHeader key={optgroup} {...optgroupHeaderProps}>
            {optgroup}
          </OptgroupHeader>,
        );
      }
      const groupItems = groupedItems[optgroup].map((item, index) => {
        itemIndex = itemIndex + 1;
        const {getRequiredItemProps = (item, index) => ({})} = props;

        const {
          disabled,
          isFocused,
          isHighlighted,
          resetMenu = () => {},
          ...restProps
        } = getRequiredItemProps(item, itemIndex);

        return (
          <Option
            renderAll={renderAll}
            key={itemIndex}
            item={item}
            overrides={props.overrides}
            resetMenu={resetMenu}
            role="option"
            $disabled={disabled}
            $isFocused={isFocused}
            $isHighlighted={isHighlighted}
            aria-disabled={disabled}
            aria-selected={isHighlighted && isFocused}
            {...restProps}
            {...optionProps}
          />
        );
      });
      return [els.concat(groupItems), itemIndex];
    },
    [[], -1],
  );

  const isEmpty = optgroups.every(optgroup => !groupedItems[optgroup].length);

  return (
    <LocaleContext.Consumer>
      {(locale: LocaleT) => (
        <List
          aria-activedescendant={props.activedescendantId || null}
          role="listbox"
          ref={rootRef}
          onClick={focusMenu}
          onMouseEnter={focusMenu}
          onMouseLeave={handleMouseLeave}
          onMouseOver={focusMenu}
          onFocus={forkFocus({onFocus: focusMenu}, handleFocus)}
          onBlur={forkBlur({onBlur: unfocusMenu}, handleBlur)}
          onKeyDown={event => {
            if (props.isFocused) {
              handleKeyDown(event);
            }
          }}
          tabIndex={0}
          data-baseweb="menu"
          $isFocusVisible={focusVisible}
          {...listProps}
        >
          {isEmpty ? (
            <EmptyState aria-live="polite" aria-atomic {...emptyStateProps}>
              {props.noResultsMsg || locale.menu.noResultsMsg}
            </EmptyState>
          ) : (
            elements
          )}
        </List>
      )}
    </LocaleContext.Consumer>
  );
}
