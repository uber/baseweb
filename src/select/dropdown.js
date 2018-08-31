/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
import * as React from 'react';
import {
  SearchIcon as StyledSearchIcon,
  DropDown as StyledDropDown,
  DropDownItem as StyledDropDownItem,
  Option as StyledOption,
} from './styled-components';

import {ICON, STATE_CHANGE_TYPE} from './constants';

import {StatefulMenu} from '../menu';
import type {DropDownPropsT} from './types';
import {getOverride} from '../helpers/overrides';

const SelectDropDown = function(props: DropDownPropsT) {
  const {
    overrides: {
      SearchIcon: SearchIconOverride,
      DropDown: DropDownOverride,
      DropDownItem: DropDownItemOverride,
      Option: OptionOverride,
    } = {},
  } = props;
  const SearchIcon = getOverride(SearchIconOverride) || StyledSearchIcon;
  const DropDown = getOverride(DropDownOverride) || StyledDropDown;
  const DropDownItem = getOverride(DropDownItemOverride) || StyledDropDownItem;
  const Option = getOverride(OptionOverride) || StyledOption;
  const {
    options = [],
    getOptionLabel,
    isDropDownOpen,
    selectedOptions,
    onChange,
    type,
    rows,
  } = props;
  return options.length ? (
    <StatefulMenu
      getItemLabel={option => {
        const $selected = selectedOptions.find(
          selected => selected.id === option.id,
        );
        const events = option.disabled
          ? {
              onClickCapture: e => e.stopPropagation(),
            }
          : {
              onClick: e =>
                onChange(e, STATE_CHANGE_TYPE.select, option.id, option.label),
            };
        return (
          <Option
            disabled={option.disabled}
            $selected={$selected}
            {...events}
            key={option.id}
          >
            {$selected && (
              <SearchIcon
                $type={ICON.selected}
                src={
                  'data:image/svg+xml;utf8,<svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 6L4 9L10 1" stroke="#1B6DE0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                }
              />
            )}
            {getOptionLabel(option)}
          </Option>
        );
      }}
      overrides={{
        /* eslint-disable-next-line react/display-name*/
        List: listProps => (
          <DropDown
            {...listProps}
            $rows={rows}
            $type={type}
            $isOpen={isDropDownOpen}
          />
        ),
        ListItem: DropDownItem,
      }}
      items={options}
    />
  ) : (
    <div />
  );
};
SelectDropDown.displayName = 'SelectDropDown';
export default SelectDropDown;
