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
import {getSharedProps} from './utils.js';
import {getOverrides} from '../helpers/overrides.js';
// Types
import type {StatelessMenuPropsT} from './types.js';

export default function Menu({
  getRequiredItemProps = (item, index) => ({}),
  items,
  overrides = {},
  rootRef = React.createRef(),
}: StatelessMenuPropsT) {
  const [List, listProps] = getOverrides(overrides.List, StyledList);
  const [Option, optionProps] = getOverrides(overrides.Option, OptionList);
  return (
    <List role="listbox" $ref={rootRef} {...listProps}>
      {items.map((item, index) => {
        const requiredProps = getRequiredItemProps(item, index);
        return (
          <Option
            item={item}
            key={index}
            role="option"
            tabIndex={index === 0 ? 0 : -1} // Allows tab focus into first element
            {...getSharedProps(requiredProps)}
            {...optionProps}
          />
        );
      })}
    </List>
  );
}
