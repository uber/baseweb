/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { OverrideT } from '../helpers/overrides';
import { STATE_CHANGE_TYPES, OPTION_LIST_SIZE } from './constants';

import type { SyntheticEvent, FocusEvent, MouseEvent } from 'react';

// flowlint-next-line unclear-type:off
export type ItemT = any;
export type ArrayItemsT = ReadonlyArray<ItemT>;
export type GroupedItemsT = {
  __ungrouped: ArrayItemsT;
  [x: string]: ArrayItemsT;
};
export type ItemsT = ArrayItemsT | GroupedItemsT;

export type GetItemLabelFnT = (item: ItemT) => React.ReactNode;

export type GetProfileItemLabelsFnT = (item: ItemT) => {
  title?: string;
  subtitle?: string;
  body?: string;
};

export type GetProfileItemImgFnT = (
  // flowlint-next-line unclear-type:off
  item: ItemT
) => string | React.ComponentType<any>;

export type GetProfileItemImgTextFnT = (item: ItemT) => string;

export type SetRootRefFnT = (ref: React.RefObject<typeof HTMLElement>) => void;

export type RootRefT = {
  current: null | HTMLElement;
};

export type OnItemSelectFnT = (a: {
  item: ItemT;
  event?: SyntheticEvent<HTMLElement> | KeyboardEvent;
}) => unknown;

export type ProfileOverridesT = {
  List?: OverrideT;
  ListItemProfile?: OverrideT;
  ProfileImgContainer?: OverrideT;
  ProfileImg?: OverrideT;
  ProfileLabelsContainer?: OverrideT;
  ProfileTitle?: OverrideT;
  ProfileSubtitle?: OverrideT;
  ProfileBody?: OverrideT;
};

export type RenderItemPropsT = {
  disabled?: boolean;
  ref?: React.RefObject<typeof HTMLElement>;
  id?: string | null;
  isFocused?: boolean;
  // indicates when the item is visually focused
  isHighlighted?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => unknown;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => unknown;
  resetMenu?: () => unknown;
};

export type GetRequiredItemPropsFnT = (item: ItemT, index: number) => Partial<RenderItemPropsT>;

export type StateReducerFnT = (
  changeType: keyof typeof STATE_CHANGE_TYPES | undefined | null,
  changes: StatefulContainerStateT,
  currentState: StatefulContainerStateT
) => StatefulContainerStateT;

export type StatefulContainerStateT = {
  // id of the currently highlighted item (from keyboard control)
  activedescendantId?: string | null;
  // index of currently highlighted item (from keyboard control)
  highlightedIndex: number;
  // indicates when the menu can be navigated by keyboard and affects menu item option rendering
  // see https://github.com/uber/baseweb/issues/993 for a description.
  isFocused: boolean;
};

export type InitialStateT = {
  // id of the currently highlighted item (from keyboard control)
  activedescendantId?: string | null;
  // index of currently highlighted item (from keyboard control)
  highlightedIndex?: number;
  // indicates when the menu can be navigated by keyboard and affects menu item option rendering
  // see https://github.com/uber/baseweb/issues/993 for a description.
  isFocused?: boolean;
};

export type RenderPropsT = StatefulContainerStateT & {
  items: ItemsT;
  getRequiredItemProps: GetRequiredItemPropsFnT;
};

/**
 * Component Prop Types
 * ====================
 * Required and Optional are split into separate object types, and internals are all
 * marked as required because otherwise defaultProps will not work properly
 */

export type StatefulContainerPropsT = {
  /** List of menu items. */
  items: ItemsT;
  /** Initial state of the stateful menu. */
  initialState: InitialStateT;
  /** State reducer to intercept state changes and return new internal state */
  stateReducer: StateReducerFnT;
  /** Function to get props for each rendered item. This will have some defaults needed for keyboard
   * bindings to work properly. Every rendered item should call this.
   */
  getRequiredItemProps: GetRequiredItemPropsFnT;
  onActiveDescendantChange?: (id?: string) => unknown;
  /** Callback executed on menu item clicks. */
  onItemSelect: OnItemSelectFnT;
  /** Ref for the menu container element. Used to capture key events for navigation */
  rootRef?: RootRefT;
  /** Node for menu's keyboard listener. Default is null and keyboard handlers will listen on menu root. */
  keyboardControlNode: {
    current: HTMLElement | null;
  };
  /** whether has keyboard type-ahead function */
  typeAhead: boolean;
  /** Child as function pattern. */
  children: (a: RenderPropsT) => React.ReactNode;
  addMenuToNesting?: (ref: { current: HTMLElement | null }) => void;
  removeMenuFromNesting?: (ref: { current: HTMLElement | null }) => void;
  getParentMenu?: (ref: { current: HTMLElement | null }) =>
    | {
        current: HTMLElement | null;
      }
    | undefined
    | null;
  getChildMenu?: (ref: { current: HTMLElement | null }) =>
    | {
        current: HTMLElement | null;
      }
    | undefined
    | null;
  nestedMenuHoverIndex?: number;
  isNestedMenuVisible?: (ref: { current: HTMLElement | null }) => boolean;
  forceHighlight: boolean;
};

export type MenuPropsT = {
  overrides?: {
    EmptyState?: OverrideT;
    List?: OverrideT;
    Option?: OverrideT;
    OptgroupHeader?: OverrideT;
    ListItem?: OverrideT;
  };
  /** Renders all menu content for SEO purposes regardless of menu  state */
  renderAll?: boolean;
};

export type MenuProfilePropsT = {
  /** Returns an object consisting of title, subtitle, and body to render menu item */
  getProfileItemLabels: GetProfileItemLabelsFnT;
  /** Returns either an image source url, or a full React component to render as the image. */
  getProfileItemImg: GetProfileItemImgFnT;
  /** Returns the alt text for the image */
  getProfileItemImgText: GetProfileItemImgTextFnT;
  overrides?: ProfileOverridesT;
};

export type SharedStatelessPropsT = {
  /** Id of the highlighted menu item. */
  activedescendantId?: string | null;
  /** Function to get props for each rendered item. This will have some defaults needed for keyboard
   * bindings to work properly. Every rendered item should call this.
   */
  /** Passed to the top level menu element. */
  'aria-label'?: string;
  getRequiredItemProps?: GetRequiredItemPropsFnT;
  isFocused?: boolean;
  handleMouseLeave?: (event: MouseEvent<HTMLElement>) => unknown;
  /** Index of highlighted menu item. */
  highlightedIndex?: number;
  /** List of menu items. */
  items: ItemsT;
  /** Message to be displayed if no menu items are passed in. */
  noResultsMsg?: React.ReactNode;
  onBlur?: (event: FocusEvent<HTMLElement>) => unknown;
  onFocus?: (event: FocusEvent<HTMLElement>) => unknown;
  /** Ref for the menu container element. Used to capture key events for navigation */
  rootRef?: RootRefT;
  focusMenu?: (event: FocusEvent | MouseEvent | KeyboardEvent) => unknown;
  unfocusMenu?: () => unknown;
  handleKeyDown?: (event: KeyboardEvent) => unknown;
};

export type StatefulMenuPropsT = {
  /** List of menu items. */
  items: ItemsT;
  /** Initial state of the stateful menu. */
  initialState?: InitialStateT;
  /** State reducer to intercept state changes and return new internal state */
  stateReducer?: StateReducerFnT;
  /** Function to get props for each rendered item. This will have some defaults needed for keyboard
   * bindings to work properly. Every rendered item should call this.
   */
  getRequiredItemProps?: GetRequiredItemPropsFnT;
  onActiveDescendantChange?: (id?: string) => unknown;
  /** Callback executed on menu item clicks. */
  onItemSelect?: OnItemSelectFnT;
  /** Ref for the menu container element. Used to capture key events for navigation */
  rootRef?: RootRefT;
  /** Child as function pattern. */
  children?: (a: RenderPropsT) => React.ReactNode;
  /** whether has keyboard type-ahead function */
  typeAhead?: boolean;
  addMenuToNesting?: (ref: { current: HTMLElement | null }) => void;
  removeMenuFromNesting?: (ref: { current: HTMLElement | null }) => void;
  getParentMenu?: (ref: { current: HTMLElement | null }) =>
    | {
        current: HTMLElement | null;
      }
    | undefined
    | null;
  getChildMenu?: (ref: { current: HTMLElement | null }) =>
    | {
        current: HTMLElement | null;
      }
    | undefined
    | null;
  nestedMenuHoverIndex?: number;
  isNestedMenuVisible?: (ref: { current: HTMLElement | null }) => boolean;
} & MenuPropsT;

export type StatefulMenuProfilePropsT = StatefulContainerPropsT & MenuProfilePropsT;

export type StatelessMenuPropsT = SharedStatelessPropsT & MenuPropsT;

export type StatelessMenuProfilePropsT = SharedStatelessPropsT & MenuProfilePropsT;

export type OptionListPropsT = {
  /** Item to parse and render. */
  item: ItemT;
  /** Function used to get the string label for each item. */
  getItemLabel: GetItemLabelFnT;
  /** Used to render a sub menu at this menu item. You'll often render another menu from this function. */
  getChildMenu?: (item: ItemT) => React.ReactNode;
  onClick?: (event: MouseEvent) => unknown;
  /** Callback used to change highlighted index in stateful menu. */
  onMouseDown?: (event: MouseEvent) => unknown;
  /** Callback used to change highlighted index in stateful menu. */
  onMouseEnter?: (event: MouseEvent) => unknown;
  /** Renders UI in defined scale. */
  size?: keyof typeof OPTION_LIST_SIZE;
  overrides?: {
    ListItem?: OverrideT;
    ListItemAnchor?: OverrideT;
    ChildMenuPopover?: OverrideT;
  };
  renderHrefAsAnchor?: boolean;
  /** Utility to reset menu to default state. Useful for rendering child menus. */
  resetMenu?: () => void;
  /** Renders UI in 'highlighted' state. */
  $isHighlighted?: boolean;
  /** Is the parent menu focused. determines if highlighted item should be blue or black */
  $isFocused?: boolean;
  /** Renders all menu content for SEO purposes regardless of menu  state */
  renderAll?: boolean;
  /** Is the item disabled */
  $disabled?: boolean;
  /** Is the item disabled */
  'aria-disabled'?: boolean;
  /** Is the item selected */
  'aria-selected'?: boolean;
  /** Id of the item */
  id?: string;
  /** Accessibility role of the item */
  role?: string;
};

export type OptionProfilePropsT = {
  /** Item to parse and render. */
  item: ItemT;
  /** Used to render a sub menu at this menu item. You'll often render another menu from this function. */
  getChildMenu?: (item: ItemT) => React.ReactNode;
  /** Returns an object consisting of title, subtitle, and body to render menu item */
  getProfileItemLabels: GetProfileItemLabelsFnT;
  /** Returns either an image source url, or a full React component to render as the image. */
  getProfileItemImg: GetProfileItemImgFnT;
  /** Returns the alt text for the image */
  getProfileItemImgText: GetProfileItemImgTextFnT;
  overrides?: {
    ListItemProfile?: OverrideT;
    ProfileImgContainer?: OverrideT;
    ProfileImg?: OverrideT;
    ProfileLabelsContainer?: OverrideT;
    ProfileTitle?: OverrideT;
    ProfileSubtitle?: OverrideT;
    ProfileBody?: OverrideT;
    ChildMenuPopover?: OverrideT;
  };
  /** Utility to reset menu to default state. Useful for rendering child menus. */
  resetMenu?: () => void;
  /** Renders UI in 'highlighted' state. */
  $isHighlighted?: boolean;
  /** Renders all menu content for SEO purposes regardless of menu  state */
  renderAll?: boolean;
};

export type NestedMenuRefT = {
  current: HTMLElement | null;
};
export type NestedMenuContextT = {
  addMenuToNesting: (ref: NestedMenuRefT) => void;
  removeMenuFromNesting: (ref: NestedMenuRefT) => void;
  getParentMenu: (ref: NestedMenuRefT) => NestedMenuRefT | undefined | null;
  getChildMenu: (ref: NestedMenuRefT) => NestedMenuRefT | undefined | null;
  nestedMenuHoverIndex: number;
  isNestedMenuVisible: (ref: NestedMenuRefT) => boolean;
  mountRef: NestedMenuRefT;
};
