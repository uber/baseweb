/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  StyledDropdownContainer,
  StyledOptionContent,
} from './styled-components';
import {StatefulMenu} from '../menu';
import type {DropdownPropsT} from './types';
import {getOverrides, mergeOverrides} from '../helpers/overrides';

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
    } = this.props;
    return {
      $error: error,
      $isLoading: isLoading,
      $multi: multi,
      $required: required,
      $searchable: searchable,
      $size: size,
      $type: type,
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

  onMouseDown = (e: Event) => {
    e.preventDefault();
  };

  render() {
    // TODO(#185) Add no-results and loading states to menu
    const {
      maxDropdownHeight,
      multi,
      onItemSelect,
      options = [],
      overrides = {},
      size,
    } = this.props;
    const [DropdownContainer, dropdownContainerProps] = getOverrides(
      overrides.DropdownContainer,
      StyledDropdownContainer,
    );
    return (
      <DropdownContainer {...this.getSharedProps()} {...dropdownContainerProps}>
        <StatefulMenu
          onItemSelect={onItemSelect}
          items={options}
          size={size}
          overrides={mergeOverrides(
            {
              List: {
                style: ({$theme: {sizing}}) => ({
                  maxHeight: maxDropdownHeight,
                }),
                props: {
                  'aria-multiselectable': multi,
                },
              },
              Option: {
                props: {
                  getItemLabel: this.getItemLabel,
                  // figure out why the onClick handler is not
                  // triggered without this temporary fix
                  onMouseDown: this.onMouseDown,
                },
              },
            },
            {
              List: overrides.Dropdown || {},
              Option: overrides.DropdownOption || {},
            },
          )}
        />
      </DropdownContainer>
    );
  }
}
