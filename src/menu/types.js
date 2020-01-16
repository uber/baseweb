/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';
import {STATE_CHANGE_TYPES, OPTION_LIST_SIZE} from './constants.js';

export type ItemT = *;
export type ArrayItemsT = $ReadOnlyArray<ItemT>;
export type GroupedItemsT = {__ungrouped: ArrayItemsT, [string]: ArrayItemsT};
export type ItemsT = ArrayItemsT | GroupedItemsT;

export type GetItemLabelFnT = (item: ItemT) => React.Node;

export type GetProfileItemLabelsFnT = (
  item: ItemT,
) => {
  title?: string,
  subtitle?: string,
  body?: string,
};

export type GetProfileItemImgFnT = (
  item: ItemT,
) => string | React.ComponentType<*>;

export type GetProfileItemImgTextFnT = (item: ItemT) => string;

export type SetRootRefFnT = (ref: React$ElementRef<*>) => void;

export type RootRefT = React$ElementRef<*>;

export type OnItemSelectFnT = ({
  item: ItemT,
  event?: SyntheticEvent<HTMLElement> | KeyboardEvent,
}) => mixed;

export type ProfileOverridesT = {
  List?: OverrideT<*>,
  ListItemProfile?: OverrideT<*>,
  ProfileImgContainer?: OverrideT<*>,
  ProfileImg?: OverrideT<*>,
  ProfileLabelsContainer?: OverrideT<*>,
  ProfileTitle?: OverrideT<*>,
  ProfileSubtitle?: OverrideT<*>,
  ProfileBody?: OverrideT<*>,
};

export type RenderItemPropsT = {
  disabled?: boolean,
  ref?: React$ElementRef<*>,
  id?: ?string,
  isFocused?: boolean,
  // indicates when the item is visually focused
  isHighlighted?: boolean,
  resetMenu?: () => mixed,
};

export type GetRequiredItemPropsFnT = (
  item: ItemT,
  index: number,
) => RenderItemPropsT;

export type StateReducerFnT = (
  changeType: ?$Keys<typeof STATE_CHANGE_TYPES>,
  changes: StatefulContainerStateT,
  currentState: StatefulContainerStateT,
) => StatefulContainerStateT;

export type StatefulContainerStateT = {
  // id of the currently highlighted item (from keyboard control)
  activedescendantId?: ?string,
  // index of currently highlighted item (from keyboard control)
  highlightedIndex: number,
  // indicates when the menu can be navigated by keyboard and affects menu item option rendering
  // see https://github.com/uber/baseweb/issues/993 for a description.
  isFocused: boolean,
};

export type InitialStateT = {
  // id of the currently highlighted item (from keyboard control)
  activedescendantId?: ?string,
  // index of currently highlighted item (from keyboard control)
  highlightedIndex?: number,
  // indicates when the menu can be navigated by keyboard and affects menu item option rendering
  // see https://github.com/uber/baseweb/issues/993 for a description.
  isFocused?: boolean,
};

export type RenderPropsT = StatefulContainerStateT & {
  items: ItemsT,
  getRequiredItemProps: GetRequiredItemPropsFnT,
};

/**
 * Component Prop Types
 * ====================
 * Required and Optional are split into separate object types, and internals are all
 * marked as required because otherwise defaultProps will not work properly
 */

export type StatefulContainerPropsT = {
  /** List of menu items. */
  items: ItemsT,
  /** Initial state of the stateful menu. */
  initialState: InitialStateT,
  /** State reducer to intercept state changes and return new internal state */
  stateReducer: StateReducerFnT,
  /** Function to get props for each rendered item. This will have some defaults needed for keyboard
   * bindings to work properly. Every rendered item should call this.
   */
  getRequiredItemProps: GetRequiredItemPropsFnT,
  /** Callback executed on menu item clicks. */
  onItemSelect: OnItemSelectFnT,
  /** Ref for the menu container element. Used to capture key events for navigation */
  rootRef?: RootRefT,
  /** Child as function pattern. */
  children: RenderPropsT => React.Node,
  addMenuToNesting?: (ref: {current: HTMLElement | null}) => void,
  removeMenuFromNesting?: (ref: {current: HTMLElement | null}) => void,
  getParentMenu?: (ref: {current: HTMLElement | null}) => ?{
    current: HTMLElement | null,
  },
  getChildMenu?: (ref: {current: HTMLElement | null}) => ?{
    current: HTMLElement | null,
  },
};

export type MenuPropsT = {
  overrides?: {
    EmptyState?: OverrideT<*>,
    List?: OverrideT<*>,
    Option?: OverrideT<*>,
    OptgroupHeader?: OverrideT<*>,
  },
};

export type MenuProfilePropsT = {
  /** Returns an object consisting of title, subtitle, and body to render menu item */
  getProfileItemLabels: GetProfileItemLabelsFnT,
  /** Returns either an image source url, or a full React component to render as the image. */
  getProfileItemImg: GetProfileItemImgFnT,
  /** Returns the alt text for the image */
  getProfileItemImgText: GetProfileItemImgTextFnT,
  overrides?: ProfileOverridesT,
};

export type SharedStatelessPropsT = {
  /** Id of the highlighted menu item. */
  activedescendantId?: ?string,
  /** Function to get props for each rendered item. This will have some defaults needed for keyboard
   * bindings to work properly. Every rendered item should call this.
   */
  getRequiredItemProps?: GetRequiredItemPropsFnT,
  /** Index of highlighted menu item. */
  highlightedIndex?: number,
  /** List of menu items. */
  items: ItemsT,
  /** Message to be displayed if no menu items are passed in. */
  noResultsMsg?: React.Node,
  onBlur?: (event: SyntheticFocusEvent<HTMLElement>) => mixed,
  onFocus?: (event: SyntheticFocusEvent<HTMLElement>) => mixed,
  /** Ref for the menu container element. Used to capture key events for navigation */
  rootRef?: RootRefT,
  focusMenu?: (event: FocusEvent | MouseEvent | KeyboardEvent) => mixed,
  unfocusMenu?: () => mixed,
};

export type StatefulMenuPropsT = {
  /** List of menu items. */
  items: ItemsT,
  /** Initial state of the stateful menu. */
  initialState?: InitialStateT,
  /** State reducer to intercept state changes and return new internal state */
  stateReducer?: StateReducerFnT,
  /** Function to get props for each rendered item. This will have some defaults needed for keyboard
   * bindings to work properly. Every rendered item should call this.
   */
  getRequiredItemProps?: GetRequiredItemPropsFnT,
  /** Callback executed on menu item clicks. */
  onItemSelect?: OnItemSelectFnT,
  /** Ref for the menu container element. Used to capture key events for navigation */
  rootRef?: RootRefT,
  /** Child as function pattern. */
  children?: RenderPropsT => React.Node,
  addMenuToNesting?: (ref: {current: HTMLElement | null}) => void,
  removeMenuFromNesting?: (ref: {current: HTMLElement | null}) => void,
  getParentMenu?: (ref: {current: HTMLElement | null}) => ?{
    current: HTMLElement | null,
  },
  getChildMenu?: (ref: {current: HTMLElement | null}) => ?{
    current: HTMLElement | null,
  },
} & MenuPropsT;

export type StatefulMenuProfilePropsT = StatefulContainerPropsT &
  MenuProfilePropsT;

export type StatelessMenuPropsT = SharedStatelessPropsT & MenuPropsT;

export type StatelessMenuProfilePropsT = SharedStatelessPropsT &
  MenuProfilePropsT;

export type OptionListPropsT = {
  /** Item to parse and render. */
  item: ItemT,
  /** Function used to get the string label for each item. */
  getItemLabel: GetItemLabelFnT,
  /** Used to render a sub menu at this menu item. You'll often render another menu from this function. */
  getChildMenu?: (item: ItemT) => React.Node,
  /** Callback used to change highlighted index in stateful menu. */
  onMouseEnter?: (event: MouseEvent) => mixed,
  /** Renders UI in defined scale. */
  size?: $Keys<typeof OPTION_LIST_SIZE>,
  overrides?: {
    ListItem?: OverrideT<*>,
  },
  /** Utility to reset menu to default state. Useful for rendering child menus. */
  resetMenu?: () => void,
  /** Renders UI in 'highlighted' state. */
  $isHighlighted?: boolean,
  /** Is the parent menu focused. determines if highlighted item should be blue or black */
  $isFocused?: boolean,
};

export type OptionProfilePropsT = {
  /** Item to parse and render. */
  item: ItemT,
  /** Used to render a sub menu at this menu item. You'll often render another menu from this function. */
  getChildMenu?: (item: ItemT) => React.Node,
  /** Returns an object consisting of title, subtitle, and body to render menu item */
  getProfileItemLabels: GetProfileItemLabelsFnT,
  /** Returns either an image source url, or a full React component to render as the image. */
  getProfileItemImg: GetProfileItemImgFnT,
  /** Returns the alt text for the image */
  getProfileItemImgText: GetProfileItemImgTextFnT,
  overrides?: {
    ListItemProfile?: OverrideT<*>,
    ProfileImgContainer?: OverrideT<*>,
    ProfileImg?: OverrideT<*>,
    ProfileLabelsContainer?: OverrideT<*>,
    ProfileTitle?: OverrideT<*>,
    ProfileSubtitle?: OverrideT<*>,
    ProfileBody?: OverrideT<*>,
  },
  /** Utility to reset menu to default state. Useful for rendering child menus. */
  resetMenu?: () => void,
  /** Renders UI in 'highlighted' state. */
  $isHighlighted?: boolean,
};
