/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

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
import type {DropdownPropsT, OptionT} from './types.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';

export default function SelectDropdown(props: DropdownPropsT) {
  const {overrides = {}} = props;
  const [OptionContent, optionContentProps] = getOverrides(
    overrides.OptionContent,
    StyledOptionContent,
  );
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

  const sharedProps = {
    $error: props.error,
    $isLoading: props.isLoading,
    $multi: props.multi,
    $required: props.required,
    $searchable: props.searchable,
    $size: props.size,
    $type: props.type,
    $width: props.width,
  };

  const getItemLabel = React.useCallback(
    (option: OptionT) => {
      let $selected;
      if (Array.isArray(props.value)) {
        $selected = !!props.value.find(
          selected =>
            selected && selected[props.valueKey] === option[props.valueKey],
        );
      } else {
        $selected = props.value[props.valueKey] === option[props.valueKey];
      }

      const optionSharedProps = {
        $selected,
        $disabled: Boolean(option.disabled),
        $isHighlighted: option.isHighlighted,
      };
      return (
        <OptionContent
          aria-readonly={option.disabled}
          aria-selected={$selected}
          key={option[props.valueKey]}
          {...sharedProps}
          {...optionSharedProps}
          {...optionContentProps}
        >
          {props.getOptionLabel({option, optionState: optionSharedProps})}
        </OptionContent>
      );
    },
    [overrides, props.getOptionLabel, props.value, props.valueKey],
  );

  const onMouseDown = React.useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  const highlightedIndex = React.useMemo(() => {
    // Highlight only first value as menu supports only a single highlight index
    let firstValue: OptionT = {};

    if (Array.isArray(props.value) && props.value.length > 0) {
      firstValue = props.value[0];
    } else if (!(props.value instanceof Array)) {
      firstValue = props.value;
    }

    if (Object.keys(firstValue).length > 0) {
      const a = props.options.findIndex(
        option =>
          option && option[props.valueKey] === firstValue[props.valueKey],
      );
      return a || 0;
    }
    return 0;
  }, [props.value, props.options, props.valueKey]);

  const groupedOptions = React.useMemo(() => {
    return props.options.reduce(
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
  }, [props.options]);

  return (
    <DropdownContainer
      ref={props.innerRef}
      role="listbox"
      {...sharedProps}
      {...dropdownContainerProps}
    >
      <OverriddenStatefulMenu
        noResultsMsg={props.noResultsMsg}
        onItemSelect={props.onItemSelect}
        items={groupedOptions}
        size={props.size}
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
                $maxHeight: props.maxDropdownHeight,
                'aria-multiselectable': props.multi,
              },
            },
            Option: {
              props: {
                getItemLabel,
                // figure out why the onClick handler is not
                // triggered without this temporary fix
                onMouseDown: onMouseDown,
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
