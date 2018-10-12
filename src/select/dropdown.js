/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  SelectComponentIcon as StyledSelectComponentIcon,
  DropDown as StyledDropDown,
  DropDownItem as StyledDropDownItem,
  Option as StyledOption,
  SelectSpinner as StyledSelectSpinner,
} from './styled-components';

import {ICON} from './constants';

import {StatefulMenu} from '../menu';
import {Spinner} from '../spinner';
import type {DropDownPropsT} from './types';
import {getOverrides} from '../helpers/overrides';

class SelectDropDown extends React.Component<DropDownPropsT, {}> {
  static defaultProps = {
    itemRef: [],
    dropDownRef: React.createRef(),
  };

  componentDidUpdate() {
    this.adjustDropDownHeight();
  }

  render() {
    const {overrides = {}} = this.props;
    const [SelectComponentIcon, selectComponentIconProps] = getOverrides(
      overrides.SelectComponentIcon,
      StyledSelectComponentIcon,
    );
    const [DropDown, dropDownProps] = getOverrides(
      overrides.DropDown,
      StyledDropDown,
    );
    const [DropDownItem] = getOverrides(
      overrides.DropDownItem,
      StyledDropDownItem,
    );
    const [Option, optionProps] = getOverrides(overrides.Option, StyledOption);
    const [SelectSpinner, selectSpinnerProps] = getOverrides(
      overrides.SelectSpinner,
      StyledSelectSpinner,
    );
    const {
      options = [],
      getOptionLabel,
      isDropDownOpen,
      optionsLoaded,
      selectedOptions,
      onChange,
      onItemSelect,
      type,
      rows,
      itemRef,
      dropDownRef,
    } = this.props;
    return isDropDownOpen ? (
      <StatefulMenu
        getRequiredItemProps={(option, index) => {
          const ref = itemRef[index] || (itemRef[index] = React.createRef());
          return option.disabled
            ? {
                ref,
                onClickCapture: e => e.stopPropagation(),
              }
            : {
                ref,
                onClick: e => onChange(e, option),
              };
        }}
        overrides={{
          List: {
            component: DropDown,
            props: {
              $rows: rows,
              $type: type,
              $ref: dropDownRef,
              $isOpen: isDropDownOpen,
              ...dropDownProps,
            },
          },
          Option: {
            props: {
              overrides: {
                ListItem: DropDownItem,
              },
              /* eslint-disable-next-line react/display-name*/
              getItemLabel: option => {
                const $selected = selectedOptions.find(
                  selected => selected.id === option.id,
                );
                return optionsLoaded ? (
                  <Option
                    disabled={option.disabled}
                    $selected={$selected}
                    key={option.id}
                    {...optionProps}
                  >
                    {$selected && (
                      <SelectComponentIcon
                        $type={ICON.selected}
                        src={
                          'data:image/svg+xml;utf8,<svg width="10" height="9" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 6L4 9L10 1" stroke="#1B6DE0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                        }
                        {...selectComponentIconProps}
                      />
                    )}
                    {getOptionLabel(option)}
                  </Option>
                ) : (
                  <SelectSpinner {...selectSpinnerProps}>
                    <Spinner size={22} />
                  </SelectSpinner>
                );
              },
            },
          },
        }}
        onItemSelect={onItemSelect}
        items={optionsLoaded ? options : [{}]}
      />
    ) : (
      <div />
    );
  }
  adjustDropDownHeight() {
    const {rows, itemRef, dropDownRef} = this.props;
    if (rows && __BROWSER__ && itemRef.length > rows && dropDownRef.current) {
      let maxHeight = 0;
      for (let i = 0; i < rows; i++) {
        if (itemRef[i].current) {
          maxHeight += itemRef[i].current.clientHeight;
        }
      }
      const suffixElement = itemRef[rows + 1];
      if (suffixElement && suffixElement.current) {
        maxHeight += suffixElement.current.clientHeight / 2;
      }
      maxHeight += 'px';
      dropDownRef.current.style.maxHeight = maxHeight;
    }
  }
}

export default SelectDropDown;
