/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
// Components
import {List as StyledList} from './styled-components.js';
import OptionList from './option-list.js';
import {getOverrides} from '../helpers/overrides.js';
// Types
import type {StatelessMenuPropsT} from './types.js';

export default function Menu(props: StatelessMenuPropsT) {
  const {
    getRequiredItemProps = (item, index) => ({}),
    items,
    overrides = {},
    rootRef = React.createRef(),
    focusMenu = () => {},
    unfocusMenu = () => {},
  } = props;

  const [List, listProps] = getOverrides(overrides.List, StyledList);
  const [Option, optionProps] = getOverrides(overrides.Option, OptionList);

  return (
    <List
      role="listbox"
      $ref={rootRef}
      onMouseEnter={focusMenu}
      onMouseOver={focusMenu}
      onFocus={focusMenu}
      onBlur={unfocusMenu}
      tabIndex={0}
      data-baseweb="menu"
      {...listProps}
    >
      {items.map((item, index) => {
        const {
          disabled,
          isFocused,
          isHighlighted,
          ref,
          resetMenu = () => {},
          ...restProps
        } = getRequiredItemProps(item, index);

        return (
          <Option
            key={index}
            item={item}
            overrides={overrides}
            resetMenu={resetMenu}
            role="option"
            $disabled={disabled}
            $ref={ref}
            $isFocused={isFocused}
            $isHighlighted={isHighlighted}
            aria-selected={isHighlighted && isFocused}
            {...restProps}
            {...optionProps}
          />
        );
      })}
    </List>
  );
}
