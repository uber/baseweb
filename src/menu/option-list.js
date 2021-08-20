/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {LocaleContext} from '../locale/index.js';
import {getOverrides} from '../helpers/overrides.js';

import {OPTION_LIST_SIZE} from './constants.js';
import MaybeChildMenu from './maybe-child-menu.js';
import {StyledListItem, StyledListItemAnchor} from './styled-components.js';
import type {OptionListPropsT} from './types.js';

function OptionList(props: OptionListPropsT, ref: React.ElementRef<*>) {
  const {
    getChildMenu,
    getItemLabel = item => (item ? item.label : ''),
    item,
    onClick = () => {},
    onMouseEnter = () => {},
    overrides = {},
    renderHrefAsAnchor = true,
    resetMenu = () => {},
    size = OPTION_LIST_SIZE.default,
    $isHighlighted,
    renderAll,
    ...restProps
  } = props;

  const [ListItem, listItemProps] = getOverrides(
    overrides.ListItem,
    StyledListItem,
  );
  const [ListItemAnchor, listItemAnchorProps] = getOverrides(
    overrides.ListItemAnchor,
    StyledListItemAnchor,
  );

  const getItem = item => {
    if (item.href && renderHrefAsAnchor) {
      return (
        <ListItemAnchor $item={item} href={item.href} {...listItemAnchorProps}>
          {getItemLabel(item)}
        </ListItemAnchor>
      );
    } else {
      return <>{getItemLabel(item)}</>;
    }
  };

  return (
    <LocaleContext.Consumer>
      {locale => (
        <MaybeChildMenu
          getChildMenu={getChildMenu}
          isOpen={!!$isHighlighted}
          item={item}
          resetParentMenu={resetMenu}
          renderAll={renderAll}
          onClick={onClick}
          overrides={overrides}
        >
          <ListItem
            aria-label={
              getChildMenu && getChildMenu(item)
                ? locale.menu.parentMenuItemAriaLabel
                : null
            }
            item={item}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            $size={size}
            $isHighlighted={$isHighlighted}
            {...restProps}
            {...listItemProps}
          >
            {getItem({isHighlighted: $isHighlighted, ...item})}
          </ListItem>
        </MaybeChildMenu>
      )}
    </LocaleContext.Consumer>
  );
}

function areEqualShallow(a, b) {
  if (!a || !b) return false;

  for (var key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

function compare(prevProps, nextProps) {
  return (
    prevProps.$isHighlighted === nextProps.$isHighlighted &&
    prevProps.$isFocused === nextProps.$isFocused &&
    areEqualShallow(prevProps.item, nextProps.item) &&
    areEqualShallow(prevProps.overrides, nextProps.overrides) &&
    prevProps.size === nextProps.size &&
    prevProps.getItemLabel === nextProps.getItemLabel &&
    prevProps.getChildMenu === nextProps.getChildMenu &&
    prevProps.resetMenu === nextProps.resetMenu
  );
}

const forwarded = React.forwardRef<OptionListPropsT, HTMLElement>(OptionList);
forwarded.displayName = 'OptionList';

export default React.memo<OptionListPropsT>(forwarded, compare);
