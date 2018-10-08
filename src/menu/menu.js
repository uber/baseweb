/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
// Components
import {List as StyledList} from './styled-components';
import OptionList from './option-list';
import {getSharedProps} from './utils';
import {getOverrides} from '../helpers/overrides';
// Types
import type {StatelessMenuPropsT} from './types';

export default function Menu({
  items,
  getRequiredItemProps = (item, index) => ({}),
  rootRef = React.createRef(),
  overrides = {},
}: StatelessMenuPropsT) {
  const [List, listProps] = getOverrides(overrides.List, StyledList);
  const [Option, optionProps] = getOverrides(overrides.Option, OptionList);
  return (
    <List $ref={rootRef} {...listProps}>
      {items.map((item, index) => {
        const requiredProps = getRequiredItemProps(item, index);
        return (
          <Option
            key={index}
            item={item}
            role="option"
            // Allows tab focus into first element
            tabIndex={index === 0 ? 0 : -1}
            {...getSharedProps(requiredProps)}
            {...optionProps}
          />
        );
      })}
    </List>
  );
}
