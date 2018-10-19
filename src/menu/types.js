/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import type {OverrideT} from '../helpers/overrides';
import {STATE_CHANGE_TYPES, OPTION_LIST_SIZE} from './constants';

export type ItemT = *;
export type ItemsT = Array<ItemT>;

export type GetItemLabelFnT = (item: ItemT) => React$Node;

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
  items: ItemsT,
  initialState: StatefulContainerStateT,
  stateReducer: StateReducerFnT,
  getRequiredItemProps: GetRequiredItemPropsFnT,
  onItemSelect: OnItemSelectFnT,
  children: RenderPropsT => React.Node,
};

export type MenuPropsT = {
  overrides?: {
    List?: OverrideT<*>,
    Option?: OverrideT<*>,
  },
};

export type MenuProfilePropsT = {
  getProfileItemLabels: GetProfileItemLabelsFnT,
  getProfileItemImg: GetProfileItemImgFnT,
  getProfileItemImgText: GetProfileItemImgTextFnT,
  overrides?: ProfileOverridesT,
};

export type SharedStatelessPropsT = {
  items: ItemsT,
  rootRef: RootRefT,
  getRequiredItemProps?: GetRequiredItemPropsFnT,
  highlightedIndex?: number,
};

export type StatefulMenuPropsT = StatefulContainerPropsT & MenuPropsT;

export type StatefulMenuProfilePropsT = StatefulContainerPropsT &
  MenuProfilePropsT;

export type StatelessMenuPropsT = SharedStatelessPropsT & MenuPropsT;

export type StatelessMenuProfilePropsT = SharedStatelessPropsT &
  MenuProfilePropsT;

export type OptionListPropsT = {
  item: ItemT,
  getItemLabel: GetItemLabelFnT,
  size: $Keys<typeof OPTION_LIST_SIZE>,
  overrides: {
    ListItem?: OverrideT<*>,
  },
};

export type OptionProfilePropsT = {
  item: ItemT,
  getProfileItemLabels: GetProfileItemLabelsFnT,
  getProfileItemImg: GetProfileItemImgFnT,
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
