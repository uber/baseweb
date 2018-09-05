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
import {mapStyletronProps} from './utils';
import {getOverrideObject} from '../helpers/overrides';
// Types
import type {StatelessMenuPropsT} from './types';

export default function Menu({
  items,
  getRequiredItemProps = (item, index) => ({key: String(index)}),
  rootRef = React.createRef(),
  overrides = {},
}: StatelessMenuPropsT) {
  const {component: List, props: listProps} = getOverrideObject(
    overrides.List,
    StyledList,
  );
  const {component: Option, props: optionProps} = getOverrideObject(
    overrides.Option,
    OptionList,
  );
  return (
    <List $ref={rootRef} {...listProps}>
      {items.map((item, index) => {
        const requiredProps = getRequiredItemProps(item, index);
        // Need to be explicit with `key` otherwise eslint throws error?
        return (
          // eslint-disable-next-line react/jsx-key
          <Option
            item={item}
            {...mapStyletronProps(requiredProps)}
            {...optionProps}
          />
        );
      })}
    </List>
  );
}
