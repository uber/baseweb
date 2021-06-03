import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

// constants

export enum ORIENTATION {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

export enum FILL {
  intrinsic = 'intrinsic',
  fixed = 'fixed',
}

export enum STATE_CHANGE_TYPE {
  change = 'change',
}

// utils

export const getTabId: (uid: string, key: React.Key) => string;
export const getTabPanelId: (uid: string, key: React.Key) => string;
export const isHorizontal: (orientation: ORIENTATION) => boolean;
export const isVertical: (orientation: ORIENTATION) => boolean;
export const isIntrinsic: (fill: FILL) => boolean;
export const isFixed: (fill: FILL) => boolean;
export const isRTL: (direction: string) => boolean;

// styled-components

export const StyledRoot: StyletronComponent<any>;
export const StyledTabList: StyletronComponent<any>;
export const StyledTab: StyletronComponent<any>;
export const StyledArtworkContainer: StyletronComponent<any>;
export const StyledTabBorder: StyletronComponent<any>;
export const StyledTabHighlight: StyletronComponent<any>;
export const StyledTabPanel: StyletronComponent<any>;

// tabs

interface TabsOverrides {
  Root?: Override<{
    $orientation?: ORIENTATION;
  }>;
  TabList?: Override<{
    $fill?: FILL;
    $orientation?: ORIENTATION;
  }>;
  TabHighlight?: Override<{
    $orientation?: ORIENTATION;
    $length?: number;
    $distance?: number;
    $animate?: boolean;
  }>;
  TabBorder?: Override<{
    $orientation?: ORIENTATION;
  }>;
}

interface TabsProps {
  children: React.ReactNode;
  activeKey?: React.Key;
  disabled?: boolean;
  fill?: FILL[keyof FILL];
  orientation?: ORIENTATION[keyof ORIENTATION];
  activateOnFocus?: boolean;
  renderAll?: boolean;
  onChange?: (params: {activeKey: React.Key}) => void;
  overrides?: TabsOverrides;
  uid?: string,
}

export const Tabs: React.FC<TabsProps>;

// tab

interface TabOverrides {
  Tab?: Override<{
    $fill?: FILL;
    $orientation?: ORIENTATION;
    $focusVisible?: boolean;
  }>;
  ArtworkContainer?: Override<{
    $orientation?: ORIENTATION;
  }>;
  TabPanel?: Override<{
    $pad?: boolean;
  }>;
}

interface TabProps {
  title?: React.ReactNode;
  key?: React.Key;
  tabRef?: React.MutableRefObject<HTMLButtonElement | undefined>;
  overrides?: TabOverrides;
  artwork?: React.ReactNode;
  children?: React.ReactNode;
}

export const Tab: React.FC<TabProps>;

// stateful-tabs

interface State {
  activeKey: React.Key;
}

interface Action {
  type: STATE_CHANGE_TYPE[keyof STATE_CHANGE_TYPE];
  payload: React.Key;
}

type StateReducer = (state: State, action: Action) => State;

type StatefulTabsProps = TabsProps & {
  initialState?: State;
  stateReducer?: StateReducer;
};

export const StatefulTabs: React.FC<StatefulTabsProps>;
