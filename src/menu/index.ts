/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type {
  Item,
  ArrayItems,
  GroupedItems,
  Items,
  MenuProps,
  StatefulContainerProps,
} from './types';
import { GetRequiredItemPropsFn, StateReducerFn } from './types';

export { default as StatefulMenu } from './stateful-menu';
export { default as StatefulContainer } from './stateful-container';
export { default as OptionList } from './option-list';
export { default as OptionProfile } from './option-profile';
export { default as Menu } from './menu';
export {
  default as NestedMenus,
  NestedMenuContext,
  type NestedMenuState,
  type NestedMenuProps,
} from './nested-menus';
// Constants
export { KEY_STRINGS, STATE_CHANGE_TYPES } from './constants';
// Styled elements
export {
  StyledEmptyState,
  StyledList,
  StyledListItem,
  StyledListItemProfile,
  StyledProfileImgContainer,
  StyledProfileImg,
  StyledProfileLabelsContainer,
  StyledProfileTitle,
  StyledProfileSubtitle,
  StyledProfileBody,
  StyledMenuDivider,
} from './styled-components';
// Flow
export * from './types';
export type { MenuLocale } from './locale';
/** @deprecated use Item instead. To be removed in future versions.*/
export type ItemT = Item;
/** @deprecated use ArrayItems instead. To be removed in future versions.*/
export type ArrayItemsT = ArrayItems;
/** @deprecated use GroupedItems instead. To be removed in future versions.*/
export type GroupedItemsT = GroupedItems;
/** @deprecated use Items instead. To be removed in future versions.*/
export type ItemsT = Items;
/** @deprecated To be removed in future versions.*/
export type BaseMenuPropsT = MenuProps;
/** @deprecated To be removed in future versions.*/
export type OnItemSelect = StatefulContainerProps['onItemSelect'];
/** @deprecated use StateReducerFn instead. To be removed in future versions.*/
export type StateReducer = StateReducerFn;
/** @deprecated use GetRequiredItemPropsFn instead. To be removed in future versions.*/
export type GetRequiredItemProps = GetRequiredItemPropsFn;
