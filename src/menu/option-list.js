/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import * as React from 'react';
// Components
import {ListItem as StyledListItem} from './styled-components.js';
import {OPTION_LIST_SIZE} from './constants.js';
import {getOverrides} from '../helpers/overrides.js';
// Types
import type {OptionListPropsT} from './types.js';

export default function OptionList({
  item,
  getItemLabel,
  size,
  overrides,
  $isHighlighted,
  ...restProps
}: OptionListPropsT) {
  const [ListItem, listItemProps] = getOverrides(
    overrides.ListItem,
    StyledListItem,
  );
  const sharedProps = {
    $size: size,
    $isHighlighted,
  };
  return (
    <ListItem {...sharedProps} {...restProps} {...listItemProps}>
      {getItemLabel({isHighlighted: $isHighlighted, ...item})}
    </ListItem>
  );
}

OptionList.defaultProps = {
  getItemLabel: (item: *) => (item ? item.label : ''),
  size: OPTION_LIST_SIZE.default,
  overrides: {},
};
