// @flow
/* eslint-disable import/prefer-default-export */
import * as React from 'react';

export type Items = Array<*>;
export type GetItemStringFn = (item: *) => string;

export type SetRootRefFn = (ref: React$ElementRef<*>) => void;
export type RootRef = React$ElementRef<*>;
export type OnItemSelectFn = (
  item: ?{},
  event: SyntheticEvent<> | KeyboardEvent,
) => mixed;

export type InjectableComponentProps = {
  List?: React.ComponentType<{}>,
  ListItem?: React.ComponentType<{}>,
};

export type RenderItemProps = {
  key: string,
  ref?: React$ElementRef<*>,
  // indicates when the item is visually focused
  isHighlighted?: boolean,
  role?: string,
  // indicates when the item is visually focused
  'aria-activedescendant'?: boolean,
};
export type GetRequiredItemPropsFn = (
  item: {},
  index: number,
) => RenderItemProps;

export type StateReducerFn = (
  changeType: string,
  changes: StatefulContainerState,
  currentState: StatefulContainerState,
) => StatefulContainerState;

export type StatefulContainerState = {
  // index of currently highlighted item (from keyboard control)
  highlightedIndex: number,
};

export type RenderProps = StatefulContainerState & {
  items: Items,
  getItemString: GetItemStringFn,
  rootRef: RootRef,
  getRequiredItemProps: GetRequiredItemPropsFn,
};

/**
 * Component Prop Types
 * ====================
 * Required and Optional are split into separate object types, and internals are all
 * marked as required because otherwise defaultProps will not work properly
 */

export type DefaultStatefulContainerProps = {
  initialState: StatefulContainerState,
  stateReducer: StateReducerFn,
  onItemSelect: OnItemSelectFn,
  children: RenderProps => React.Node,
};

export type StatefulContainerProps = {
  items: Items,
  getItemString: GetItemStringFn,
  initialState?: StatefulContainerState,
  stateReducer?: StateReducerFn,
  onItemSelect?: OnItemSelectFn,
  children?: RenderProps => React.Node,
};

export type StatefulMenulistProps = StatefulContainerProps & {
  components?: InjectableComponentProps,
};

export type StatelessMenulistProps = {
  items: Items,
  getItemString: GetItemStringFn,
  rootRef: RootRef,
  getRequiredItemProps?: GetRequiredItemPropsFn,
  highlightedIndex?: number,
  components?: InjectableComponentProps,
};
