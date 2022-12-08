/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { LocaleContext } from '../locale';
// Components
import {
  StyledList,
  StyledEmptyState,
  StyledOptgroupHeader,
  StyledMenuDivider,
} from './styled-components';
import OptionList from './option-list';
import { getOverrides } from '../helpers/overrides';
// Types
import type { RenderItemProps, StatelessMenuProps } from './types';
import type { Locale } from '../locale';

import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible';

import type { SyntheticEvent } from 'react';

export default function Menu(props: StatelessMenuProps) {
  const {
    overrides = {},
    'aria-label': ariaLabel = 'Menu',
    rootRef = React.createRef(),
    focusMenu = () => {},
    unfocusMenu = () => {},
    handleMouseLeave = () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleKeyDown = (event: KeyboardEvent) => {},
    renderAll = false,
  } = props;

  const [focusVisible, setFocusVisible] = React.useState(false);
  const handleFocus = (event: SyntheticEvent) => {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBlur = (event: SyntheticEvent) => {
    if (focusVisible !== false) {
      setFocusVisible(false);
    }
  };

  const [List, listProps] = getOverrides(overrides.List, StyledList);
  const [Option, optionProps] = getOverrides(overrides.Option, OptionList);
  const [EmptyState, emptyStateProps] = getOverrides(overrides.EmptyState, StyledEmptyState);
  const [OptgroupHeader, optgroupHeaderProps] = getOverrides(
    overrides.OptgroupHeader,
    StyledOptgroupHeader
  );
  const [MenuDivider, menuDividerProps] = getOverrides(overrides.MenuDivider, StyledMenuDivider);

  const groupedItems = Array.isArray(props.items) ? { __ungrouped: props.items } : props.items;
  const optgroups = Object.keys(groupedItems);
  const [elements] = optgroups.reduce(
    ([els, itemIndex], optgroup) => {
      if (optgroup !== '__ungrouped') {
        els.push(
          // @ts-ignore
          <OptgroupHeader key={optgroup} {...optgroupHeaderProps}>
            {optgroup}
          </OptgroupHeader>
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // @ts-ignore
      const groupItems = groupedItems[optgroup].map((item, index) => {
        itemIndex = itemIndex + 1;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { getRequiredItemProps = (item, index) => ({} as RenderItemProps) } = props;

        if (item.divider === true) {
          return <MenuDivider key={itemIndex} {...menuDividerProps} />;
        }

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
    [[], -1]
  );

  // @ts-ignore
  const isEmpty = optgroups.every((optgroup) => !groupedItems[optgroup].length);

  return (
    <LocaleContext.Consumer>
      {(locale: Locale) => (
        <List
          aria-activedescendant={props.activedescendantId || null}
          role="listbox"
          aria-label={ariaLabel}
          ref={rootRef}
          onMouseEnter={focusMenu}
          onMouseLeave={handleMouseLeave}
          onMouseOver={focusMenu}
          onFocus={forkFocus({ onFocus: focusMenu }, handleFocus)}
          onBlur={forkBlur({ onBlur: unfocusMenu }, handleBlur)}
          // @ts-ignore
          onKeyDown={(event) => {
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
