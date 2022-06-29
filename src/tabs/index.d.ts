import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export declare const ORIENTATION: {
  horizontal: 'horizontal';
  vertical: 'vertical';
};
export declare const STATE_CHANGE_TYPE: {
  change: 'change';
};

export interface State {
  activeKey: React.Key;
}

export type StateReducer = (
  stateChangeType: typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE],
  nextState: State,
  currentState: State
) => State;

export interface TabsOverrides<T> {
  Root?: Override<T>;
  TabBar?: Override<T>;
  TabContent?: Override<T>;
  Tab?: Override<T>;
}

export interface TabsProps {
  children: React.ReactNode;
  activeKey?: React.Key;
  disabled?: boolean;
  renderAll?: boolean;
  onChange?: (args: { activeKey: React.Key }) => any;
  orientation?: typeof ORIENTATION[keyof typeof ORIENTATION];
  overrides?: TabsOverrides<SharedProps & { $active?: boolean }>;
}

export declare const Tabs: React.FC<TabsProps>;

export type StatefulTabsProps = TabsProps & {
  activeKey?: never;
  renderAll?: boolean;
  initialState?: State;
  stateReducer?: StateReducer;
};

export class StatefulTabs extends React.Component<StatefulTabsProps, State> {
  onTabChange(newState: State): void;
  internalSetState(
    type: typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE],
    changes: State
  ): void;
  getInitialKey(): any;
}

export interface TabOverrides<T> {
  Tab?: Override<T>;
}

export interface SharedProps {
  $disabled?: boolean;
  $active?: boolean;
  $orientation?: typeof ORIENTATION[keyof typeof ORIENTATION];
}

export interface TabProps {
  children?: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  key?: React.Key;
  onClick?: (e: Event) => any;
  onKeyDown?: (e: KeyboardEvent) => any;
  onSelect?: () => any;
  overrides?: TabOverrides<SharedProps>;
  title?: React.ReactNode;
  id?: string;
  $orientation?: typeof ORIENTATION[keyof typeof ORIENTATION];
}

export class Tab extends React.Component<TabProps> {
  onClick(e: Event): void;
  onKeyDown(e: KeyboardEvent): void;
  getSharedProps(): SharedProps;
}

export declare const StyledRoot: StyletronComponent<any, any>;
export declare const StyledTab: StyletronComponent<any, any>;
export declare const StyledTabBar: StyletronComponent<any, any>;
export declare const StyledTabContent: StyletronComponent<any, any>;
