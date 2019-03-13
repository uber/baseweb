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
      onMouseEnter={props.focusMenu}
      onMouseOver={props.focusMenu}
      onMouseLeave={props.unfocusMenu}
      onFocus={props.focusMenu}
      onBlur={props.unfocusMenu}
      tabIndex={0}
      {...listProps}
    >
      {items.map((item, index) => {
        const {
          disabled,
          isFocused,
          isHighlighted,
          ref,
          resetMenu = () => {},
          ...rest
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
            {...optionProps}
            {...rest}
          />
        );
      })}
    </List>
  );
}
