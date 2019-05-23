/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {getOverrides} from '../helpers/overrides.js';

import {OPTION_LIST_SIZE} from './constants.js';
import MaybeChildMenu from './maybe-child-menu.js';
import {StyledListItem} from './styled-components.js';
import type {OptionListPropsT} from './types.js';

function OptionList(props: OptionListPropsT, ref) {
  const {
    getChildMenu,
    getItemLabel = item => (item ? item.label : ''),
    item,
    onMouseEnter = () => {},
    overrides = {},
    resetMenu = () => {},
    size = OPTION_LIST_SIZE.default,
    $isHighlighted,
    ...restProps
  } = props;

  const [ListItem, listItemProps] = getOverrides(
    overrides.ListItem,
    StyledListItem,
  );

  return (
    <MaybeChildMenu
      getChildMenu={getChildMenu}
      isOpen={!!$isHighlighted}
      item={item}
      resetParentMenu={resetMenu}
    >
      <ListItem
        ref={ref}
        onMouseEnter={onMouseEnter}
        $size={size}
        $isHighlighted={$isHighlighted}
        {...restProps}
        {...listItemProps}
      >
        {getItemLabel({isHighlighted: $isHighlighted, ...item})}
      </ListItem>
    </MaybeChildMenu>
  );
}

export default React.forwardRef<OptionListPropsT, HTMLElement>(OptionList);
