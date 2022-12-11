/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { LocaleContext } from '../locale';
import { getOverrides } from '../helpers/overrides';

import { OPTION_LIST_SIZE } from './constants';
import MaybeChildMenu from './maybe-child-menu';
import { StyledListItem, StyledListItemAnchor } from './styled-components';
import type { OptionListProps } from './types';

function OptionList(
  props: OptionListProps,
  ref?:
    | {
        current: null | HTMLElement;
      }
    | ((a: null | HTMLElement) => unknown)
) {
  const {
    getChildMenu,
    getItemLabel = (item) => (item ? item.label : ''),
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

  const [ListItem, listItemProps] = getOverrides(overrides.ListItem, StyledListItem);
  const [ListItemAnchor, listItemAnchorProps] = getOverrides(
    overrides.ListItemAnchor,
    StyledListItemAnchor
  );

  // @ts-ignore
  const getItem = (item) => {
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
      {(locale) => (
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
            ref={ref}
            aria-label={
              getChildMenu && getChildMenu(item) ? locale.menu.parentMenuItemAriaLabel : null
            }
            item={item}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            $size={size}
            $isHighlighted={$isHighlighted}
            {...restProps}
            {...listItemProps}
          >
            {getItem({ isHighlighted: $isHighlighted, ...item })}
          </ListItem>
        </MaybeChildMenu>
      )}
    </LocaleContext.Consumer>
  );
}

// @ts-ignore
function areEqualShallow(a, b) {
  if (!a || !b) return false;

  for (var key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

// @ts-ignore
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

// @ts-ignore
const forwarded = React.forwardRef<HTMLElement, OptionListProps>(OptionList);
forwarded.displayName = 'OptionList';

export default React.memo<OptionListProps>(forwarded, compare);
