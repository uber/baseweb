/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import type { NavItem } from './types';

type GetUniqueIdentifier = (a: NavItem) => string | number;

export function defaultMapItemToNode(item: NavItem) {
  if (__DEV__) {
    if (!item.label) {
      throw Error(
        'There needs to be an unique item.label. You can implement a custom mapping with the mapItemToNode prop.'
      );
    }
  }
  return item.label;
}

function defaultGetUniqueIdentifier(item: NavItem) {
  if (__DEV__) {
    if (!item.label) {
      throw Error(
        'There needs to be an unique item.label. You can implement a custom mapping with the getUniqueIdentifier argument to setItemActive.'
      );
    }
  }
  return item.label;
}

export function mapItemsActive(items: NavItem[], predicate: (a: NavItem) => boolean) {
  return items.map<NavItem>((current) => {
    if (predicate(current)) {
      current.active = true;
    } else {
      current.active = false;
    }

    if (current.children) {
      current.children = mapItemsActive(current.children, predicate);
      if (current.children.some((child) => child.active)) {
        current.active = true;
      }
    }

    return current;
  });
}

export function setItemActive(
  items: NavItem[],
  item: NavItem,
  getUniqueIdentifier: GetUniqueIdentifier = defaultGetUniqueIdentifier
) {
  return mapItemsActive(
    items,
    (current) => getUniqueIdentifier(current) === getUniqueIdentifier(item)
  );
}
