/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';
import {STATE_CHANGE_TYPES, OPTION_LIST_SIZE} from './constants.js';

export type ItemT = *;
export type ItemsT = $ReadOnlyArray<ItemT>;

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
  /* eslint-disable-next-line flowtype/no-weak-types */
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
  ref?: React$ElementRef<*>,
  // indicates when the item is visually focused
  isHighlighted?: boolean,
  'aria-activedescendant'?: boolean,
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
  // index of currently highlighted item (from keyboard control)
  highlightedIndex: number,
};

export type RenderPropsT = StatefulContainerStateT & {
  items: ItemsT,
  rootRef: RootRefT,
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
  initialState: StatefulContainerStateT,
  /** State reducer to intercept state changes and return new internal state */
  stateReducer: StateReducerFnT,
  /** Function to get props for each rendered item. This will have some defaults needed for keyboard
   * bindings to work properly. Every rendered item should call this.
   */
  getRequiredItemProps: GetRequiredItemPropsFnT,
  /** Callback executed on menu item clicks. */
  onItemSelect: OnItemSelectFnT,
  /** Child as function pattern. */
  children: RenderPropsT => React.Node,
};

export type MenuPropsT = {
  overrides?: {
    List?: OverrideT<*>,
    Option?: OverrideT<*>,
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
  /** Function to get props for each rendered item. This will have some defaults needed for keyboard
   * bindings to work properly. Every rendered item should call this.
   */
  getRequiredItemProps?: GetRequiredItemPropsFnT,
  /** Index of highlighted menu item. */
  highlightedIndex?: number,
  /** List of menu items. */
  items: ItemsT,
  onBlur?: (event: SyntheticFocusEvent<HTMLElement>) => mixed,
  onFocus?: (event: SyntheticFocusEvent<HTMLElement>) => mixed,
  /** Ref for the menu container element. Used to capture key events for navigation */
  rootRef: RootRefT,
};

export type StatefulMenuPropsT = StatefulContainerPropsT & MenuPropsT;

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
  /** Renders UI in defined scale. */
  size: $Keys<typeof OPTION_LIST_SIZE>,
  overrides: {
    ListItem?: OverrideT<*>,
  },
  /** Renders UI in 'highlighted' state. */
  $isHighlighted?: boolean,
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
};
