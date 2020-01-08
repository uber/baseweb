/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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
import type {DropdownPropsT, OptionT, ValueT} from './types.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';

function groupOptions(options: ValueT) {
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

export default class SelectDropdown extends React.Component<DropdownPropsT> {
  getSharedProps() {
    const {
      error,
      isLoading,
      multi,
      required,
      size,
      searchable,
      type,
      width,
    } = this.props;
    return {
      $error: error,
      $isLoading: isLoading,
      $multi: multi,
      $required: required,
      $searchable: searchable,
      $size: size,
      $type: type,
      $width: width,
    };
  }
  // eslint-disable-next-line flowtype/no-weak-types
  getItemLabel = (option: {[string]: any}) => {
    const {getOptionLabel, overrides = {}, value, valueKey} = this.props;

    const [OptionContent, optionContentProps] = getOverrides(
      overrides.OptionContent,
      StyledOptionContent,
    );

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
        {...this.getSharedProps()}
        {...optionSharedProps}
        {...optionContentProps}
      >
        {getOptionLabel({option, optionState: optionSharedProps})}
      </OptionContent>
    );
  };

  onMouseDown = (e: SyntheticEvent<>) => {
    e.nativeEvent.stopImmediatePropagation();
  };

  getHighlightedIndex = () => {
    const {value, options, valueKey} = this.props;
    // Highlight only first value as menu supports only a single highlight index
    let firstValue: OptionT = {};

    if (Array.isArray(value) && value.length > 0) {
      firstValue = value[0];
    } else if (!(value instanceof Array)) {
      firstValue = value;
    }

    if (Object.keys(firstValue).length > 0) {
      const a = options.findIndex(
        option => option && option[valueKey] === firstValue[valueKey],
      );
      return a || 0;
    }
    return 0;
  };

  render() {
    // TODO(#185) Add no-results and loading states to menu
    const {
      maxDropdownHeight,
      multi,
      noResultsMsg,
      onItemSelect,
      options = [],
      overrides = {},
      size,
    } = this.props;
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
    const highlightedIndex = this.getHighlightedIndex();
    const groupedOptions = groupOptions(options);
    return (
      <DropdownContainer
        ref={this.props.innerRef}
        role="listbox"
        {...this.getSharedProps()}
        {...dropdownContainerProps}
      >
        <OverriddenStatefulMenu
          noResultsMsg={noResultsMsg}
          onItemSelect={onItemSelect}
          items={groupedOptions}
          size={size}
          initialState={{
            isFocused: true,
            highlightedIndex: highlightedIndex,
          }}
          overrides={mergeOverrides(
            {
              List: {
                component: StyledDropdown,
                style: p => ({
                  maxHeight: p.$maxHeight || null,
                }),
                props: {
                  $maxHeight: maxDropdownHeight,
                  'aria-multiselectable': multi,
                },
              },
              Option: {
                props: {
                  getItemLabel: this.getItemLabel,
                  // figure out why the onClick handler is not
                  // triggered without this temporary fix
                  onMouseDown: this.onMouseDown,
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
}
