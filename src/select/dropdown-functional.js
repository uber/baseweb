/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {
  StyledDropdownContainer,
  StyledDropdown,
  StyledDropdownListItem,
  StyledOptionContent,
} from './styled-components.js';
import {StatefulMenu} from '../menu/index.js';
import type {DropdownPropsT, OptionT, ValueT} from './types-next.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';

function groupOptions(options) {
  return options.reduce(
    (groups, option) => {
      if (option.__optgroup) {
        if (!groups[option.__optgroup]) {
          groups[option.__optgroup] = [];
        }
        groups[option.__optgroup].push(option);
      } else {
        groups.__ungrouped.push(option);
      }
      return groups;
    },
    {__ungrouped: []},
  );
}

export default function SelectDropdown<P>(props: DropdownPropsT<P>) {
  const {
    error,
    getOptionLabel,
    id,
    innerRef,
    isLoading,
    keyboardControlNode,
    maxDropdownHeight,
    multi,
    noResultsMsg,
    onActiveDescendantChange = _ => {},
    onItemSelect,
    options = [],
    overrides = {},
    required,
    searchable,
    size,
    type,
    value,
    valueKey,
    width,
  } = props;

  const [DropdownContainer, dropdownContainerProps] = getOverrides(
    overrides.DropdownContainer,
    StyledDropdownContainer,
  );
  const [ListItem, listItemProps] = getOverrides(
    overrides.DropdownListItem,
    StyledDropdownListItem,
  );
  const [
    OverriddenStatefulMenu,
    // $FlowFixMe
    {overrides: statefulMenuOverrides = {}, ...restStatefulMenuProps},
  ] = getOverrides(overrides.StatefulMenu, StatefulMenu);
  const [OptionContent, optionContentProps] = getOverrides(
    overrides.OptionContent,
    StyledOptionContent,
  );

  const sharedProps = {
    $error: error,
    $isLoading: isLoading,
    $multi: multi,
    $required: required,
    $searchable: searchable,
    $size: size,
    $type: type,
    $width: width,
  };

  const getItemLabel = React.useCallback(
    option => {
      let $selected;
      if (Array.isArray(value)) {
        $selected = !!value.find(
          selected => selected && selected[valueKey] === option[valueKey],
        );
      } else {
        $selected = value[valueKey] === option[valueKey];
      }

      const optionSharedProps = {
        $selected,
        $disabled: option.disabled,
        $isHighlighted: option.isHighlighted,
      };
      return (
        <OptionContent
          aria-readonly={option.disabled}
          aria-selected={$selected}
          key={option[valueKey]}
          {...sharedProps}
          {...optionSharedProps}
          {...optionContentProps}
        >
          {getOptionLabel({option, optionState: optionSharedProps})}
        </OptionContent>
      );
    },
    [overrides, value, valueKey],
  );

  const onMouseDown = React.useCallback(event => {
    event.nativeEvent.stopImmediatePropagation();
  }, []);

  const highlightedIndex = React.useMemo(() => {
    // Highlight only first value as menu supports only a single highlight index
    let firstValue = {};

    if (Array.isArray(value) && value.length > 0) {
      firstValue = value[0];
    } else if (!(value instanceof Array)) {
      firstValue = value;
    }

    if (Object.keys(firstValue).length > 0) {
      const a = options.findIndex(
        option => option && option[valueKey] === firstValue[valueKey],
      );
      return a === -1 ? 0 : a;
    }
    return 0;
  }, [options, value, valueKey]);

  const groupedOptions = React.useMemo(() => {
    return options.reduce(
      (groups, option) => {
        if (option.__optgroup) {
          if (!groups[option.__optgroup]) {
            groups[option.__optgroup] = [];
          }
          groups[option.__optgroup].push(option);
        } else {
          groups.__ungrouped.push(option);
        }
        return groups;
      },
      {__ungrouped: []},
    );
  }, [options]);

  return (
    <DropdownContainer
      data-no-focus-lock
      ref={innerRef}
      {...sharedProps}
      {...dropdownContainerProps}
    >
      <OverriddenStatefulMenu
        noResultsMsg={noResultsMsg}
        onActiveDescendantChange={onActiveDescendantChange}
        onItemSelect={onItemSelect}
        items={groupedOptions}
        size={size}
        initialState={{
          isFocused: true,
          highlightedIndex: highlightedIndex,
        }}
        typeAhead={false}
        keyboardControlNode={keyboardControlNode}
        forceHighlight={true}
        overrides={mergeOverrides(
          {
            List: {
              component: StyledDropdown,
              style: p => ({
                maxHeight: p.$maxHeight || null,
              }),
              props: {
                id: id ? id : null,
                $maxHeight: maxDropdownHeight,
                'aria-multiselectable': multi,
              },
            },
            Option: {
              props: {
                getItemLabel,
                onMouseDown,
                overrides: {
                  ListItem: {
                    component: ListItem,
                    props: {...listItemProps, role: 'option'},
                    // slightly hacky way to handle the list item style overrides
                    // since the menu component doesn't provide a top level overrides for it
                    // $FlowFixMe
                    style: listItemProps.$style,
                  },
                },
                renderHrefAsAnchor: false,
              },
            },
          },
          {
            List: overrides.Dropdown || {},
            Option: overrides.DropdownOption || {},
            ...statefulMenuOverrides,
          },
        )}
        {...restStatefulMenuProps}
      />
    </DropdownContainer>
  );
}
