/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { Override } from '../helpers/overrides';
import { STATE_CHANGE_TYPES, OPTION_LIST_SIZE } from './constants';

import type { SyntheticEvent, FocusEvent, MouseEvent } from 'react';

export type Item = any;
export type ArrayItems = ReadonlyArray<Item>;
export type GroupedItems = {
  __ungrouped: ArrayItems;
  [x: string]: ArrayItems;
};
export type Items = ArrayItems | GroupedItems;

export type GetItemLabelFn = (item: Item) => React.ReactNode;

export type GetProfileItemLabelsFn = (item: Item) => {
  title?: string;
  subtitle?: string;
  body?: string;
};

export type GetProfileItemImgFn = (item: Item) => string | React.ComponentType<any>;

export type GetProfileItemImgTextFn = (item: Item) => string;

export type SetRootRefFn = (ref: React.RefObject<typeof HTMLElement>) => void;

export type RootRef = {
  current: null | HTMLElement;
};

export type OnItemSelectFn = (a: {
  item: Item;
  event?: SyntheticEvent<HTMLElement> | KeyboardEvent;
}) => unknown;

export type ProfileOverrides = {
  List?: Override;
  ListItemProfile?: Override;
  ProfileImgContainer?: Override;
  ProfileImg?: Override;
  ProfileLabelsContainer?: Override;
  ProfileTitle?: Override;
  ProfileSubtitle?: Override;
  ProfileBody?: Override;
};

export type RenderItemProps = {
  disabled?: boolean;
  ref?: React.RefObject<typeof HTMLElement>;
  id?: string | null;
  isFocused?: boolean;
  // indicates when the item is visually focused
  isHighlighted?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  resetMenu?: () => void;
};

export type GetRequiredItemPropsFn = (item: Item, index: number) => RenderItemProps;

export type StateReducerFn = (
  changeType: keyof typeof STATE_CHANGE_TYPES | undefined | null,
  changes: Partial<StatefulContainerState>,
  currentState: StatefulContainerState
) => StatefulContainerState;

export type StatefulContainerState = {
  // id of the currently highlighted item (from keyboard control)
  activedescendantId?: string | null;
  // index of currently highlighted item (from keyboard control)
  highlightedIndex: number;
  // indicates when the menu can be navigated by keyboard and affects menu item option rendering
  // see https://github.com/uber/baseweb/issues/993 for a description.
  isFocused: boolean;
};

export type InitialState = {
  // id of the currently highlighted item (from keyboard control)
  activedescendantId?: string | null;
  // index of currently highlighted item (from keyboard control)
  highlightedIndex?: number;
  // indicates when the menu can be navigated by keyboard and affects menu item option rendering
  // see https://github.com/uber/baseweb/issues/993 for a description.
  isFocused?: boolean;
};

export type RenderProps = StatefulContainerState & {
  items: Items;
  getRequiredItemProps: GetRequiredItemPropsFn;
};

/**
 * Component Prop Types
 * ====================
 * Required and Optional are split into separate object types, and internals are all
 * marked as required because otherwise defaultProps will not work properly
 */

export type StatefulContainerProps = {
  /** List of menu items. */
  items: Items;
  /** Initial state of the stateful menu. */
  initialState: InitialState;
  /** State reducer to intercept state changes and return new internal state */
  stateReducer: StateReducerFn;
  /** Function to get props for each rendered item. This will have some defaults needed for keyboard
   * bindings to work properly. Every rendered item should call this.
   */
  getRequiredItemProps: GetRequiredItemPropsFn;
  onActiveDescendantChange?: (id?: string) => unknown;
  /** Callback executed on menu item clicks. */
  onItemSelect: OnItemSelectFn;
  /** Ref for the menu container element. Used to capture key events for navigation */
  rootRef?: RootRef;
  /** Node for menu's keyboard listener. Default is null and keyboard handlers will listen on menu root. */
  keyboardControlNode: {
    current: HTMLElement | null;
  };
  /** whether has keyboard type-ahead function */
  typeAhead: boolean;
  /** Child as function pattern. */
  children: (a: RenderProps) => React.ReactNode;
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

export type MenuProps = {
  overrides?: {
    EmptyState?: Override;
    List?: Override;
    Option?: Override;
    OptgroupHeader?: Override;
    ListItem?: Override;
  };
  /** Renders all menu content for SEO purposes regardless of menu  state */
  renderAll?: boolean;
};

export type MenuProfileProps = {
  /** Returns an object consisting of title, subtitle, and body to render menu item */
  getProfileItemLabels: GetProfileItemLabelsFn;
  /** Returns either an image source url, or a full React component to render as the image. */
  getProfileItemImg: GetProfileItemImgFn;
  /** Returns the alt text for the image */
  getProfileItemImgText: GetProfileItemImgTextFn;
  overrides?: ProfileOverrides;
};

export type SharedStatelessProps = {
  /** Id of the highlighted menu item. */
  activedescendantId?: string | null;
  /** Function to get props for each rendered item. This will have some defaults needed for keyboard
   * bindings to work properly. Every rendered item should call this.
   */
  /** Passed to the top level menu element. */
  'aria-label'?: string;
  getRequiredItemProps?: GetRequiredItemPropsFn;
  isFocused?: boolean;
  handleMouseLeave?: (event: MouseEvent<HTMLElement>) => unknown;
  /** Index of highlighted menu item. */
  highlightedIndex?: number;
  /** List of menu items. */
  items: Items;
  /** Message to be displayed if no menu items are passed in. */
  noResultsMsg?: React.ReactNode;
  onBlur?: (event: FocusEvent<HTMLElement>) => unknown;
  onFocus?: (event: FocusEvent<HTMLElement>) => unknown;
  /** Ref for the menu container element. Used to capture key events for navigation */
  rootRef?: RootRef;
  focusMenu?: (event: FocusEvent | MouseEvent | KeyboardEvent) => unknown;
  unfocusMenu?: () => unknown;
  handleKeyDown?: (event: KeyboardEvent) => unknown;
};

export type StatefulMenuProps = {
  /** List of menu items. */
  items: Items;
  /** Initial state of the stateful menu. */
  initialState?: InitialState;
  /** State reducer to intercept state changes and return new internal state */
  stateReducer?: StateReducerFn;
  /** Function to get props for each rendered item. This will have some defaults needed for keyboard
   * bindings to work properly. Every rendered item should call this.
   */
  getRequiredItemProps?: GetRequiredItemPropsFn;
  onActiveDescendantChange?: (id?: string) => unknown;
  /** Callback executed on menu item clicks. */
  onItemSelect?: OnItemSelectFn;
  /** Ref for the menu container element. Used to capture key events for navigation */
  rootRef?: RootRef;
  /** Child as function pattern. */
  children?: (a: RenderProps) => React.ReactNode;
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
} & MenuProps;

export type StatefulMenuProfileProps = StatefulContainerProps & MenuProfileProps;

export type StatelessMenuProps = SharedStatelessProps & MenuProps;

export type StatelessMenuProfileProps = SharedStatelessProps & MenuProfileProps;

export type OptionListProps = {
  /** Item to parse and render. */
  item: Item;
  /** Function used to get the string label for each item. */
  getItemLabel: GetItemLabelFn;
  /** Used to render a sub menu at this menu item. You'll often render another menu from this function. */
  getChildMenu?: (item: Item) => React.ReactNode;
  onClick?: (event: MouseEvent) => unknown;
  /** Callback used to change highlighted index in stateful menu. */
  onMouseDown?: (event: MouseEvent) => unknown;
  /** Callback used to change highlighted index in stateful menu. */
  onMouseEnter?: (event: MouseEvent) => unknown;
  /** Renders UI in defined scale. */
  size?: keyof typeof OPTION_LIST_SIZE;
  overrides?: {
    ListItem?: Override;
    ListItemAnchor?: Override;
    ChildMenuPopover?: Override;
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

export type OptionProfileProps = {
  /** Item to parse and render. */
  item: Item;
  /** Used to render a sub menu at this menu item. You'll often render another menu from this function. */
  getChildMenu?: (item: Item) => React.ReactNode;
  /** Returns an object consisting of title, subtitle, and body to render menu item */
  getProfileItemLabels: GetProfileItemLabelsFn;
  /** Returns either an image source url, or a full React component to render as the image. */
  getProfileItemImg: GetProfileItemImgFn;
  /** Returns the alt text for the image */
  getProfileItemImgText: GetProfileItemImgTextFn;
  overrides?: {
    ListItemProfile?: Override;
    ProfileImgContainer?: Override;
    ProfileImg?: Override;
    ProfileLabelsContainer?: Override;
    ProfileTitle?: Override;
    ProfileSubtitle?: Override;
    ProfileBody?: Override;
    ChildMenuPopover?: Override;
  };
  /** Utility to reset menu to default state. Useful for rendering child menus. */
  resetMenu?: () => void;
  /** Renders UI in 'highlighted' state. */
  $isHighlighted?: boolean;
  /** Renders all menu content for SEO purposes regardless of menu  state */
  renderAll?: boolean;
};

export type NestedMenuRef = {
  current: HTMLElement | null;
};
export type NestedMenuContextProps = {
  addMenuToNesting: (ref: NestedMenuRef) => void;
  removeMenuFromNesting: (ref: NestedMenuRef) => void;
  getParentMenu: (ref: NestedMenuRef) => NestedMenuRef | undefined | null;
  getChildMenu: (ref: NestedMenuRef) => NestedMenuRef | undefined | null;
  nestedMenuHoverIndex: number;
  isNestedMenuVisible: (ref: NestedMenuRef) => boolean;
  mountRef: NestedMenuRef;
};
