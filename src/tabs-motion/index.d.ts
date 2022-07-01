import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

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

export declare const getTabId: (uid: string, key: React.Key) => string;
export declare const getTabPanelId: (uid: string, key: React.Key) => string;
export declare const isHorizontal: (orientation: ORIENTATION) => boolean;
export declare const isVertical: (orientation: ORIENTATION) => boolean;
export declare const isIntrinsic: (fill: FILL) => boolean;
export declare const isFixed: (fill: FILL) => boolean;
export declare const isRTL: (direction: string) => boolean;

// styled-components

export declare const StyledRoot: StyletronComponent<any, any>;
export declare const StyledTabList: StyletronComponent<any, any>;
export declare const StyledTab: StyletronComponent<any, any>;
export declare const StyledArtworkContainer: StyletronComponent<any, any>;
export declare const StyledTabBorder: StyletronComponent<any, any>;
export declare const StyledTabHighlight: StyletronComponent<any, any>;
export declare const StyledTabPanel: StyletronComponent<any, any>;
export declare const StyledEndEnhancer: StyletronComponent<any, any>;
export declare const StyledTabBar: StyletronComponent<any, any>;

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
  EndEnhancer?: Override<{}>;
  TabBar?: Override<{
    $orientation?: ORIENTATION;
  }>;
}

interface TabsProps {
  children: React.ReactNode;
  activeKey?: React.Key;
  disabled?: boolean;
  fill?: typeof FILL[keyof typeof FILL];
  orientation?: typeof ORIENTATION[keyof typeof ORIENTATION];
  activateOnFocus?: boolean;
  renderAll?: boolean;
  onChange?: (params: { activeKey: React.Key }) => void;
  overrides?: TabsOverrides;
  uid?: string;
  endEnhancer?: React.ReactNode;
}

export declare const Tabs: React.FC<TabsProps>;

// tab

interface TabOverrides {
  Tab?: Override<{
    $fill?: FILL;
    $orientation?: ORIENTATION;
    $focusVisible?: boolean;
    $isActive?: boolean;
  }>;
  ArtworkContainer?: Override<{
    $orientation?: ORIENTATION;
  }>;
  TabPanel?: Override<{
    $pad?: boolean;
  }>;
}

interface TabProps {
  artwork?: React.ReactNode;
  children?: React.ReactNode;
  title?: React.ReactNode;
  disabled?: boolean;
  key?: React.Key;
  overrides?: TabOverrides;
  tabRef?: React.MutableRefObject<HTMLButtonElement | undefined>;
}

export declare const Tab: React.FC<TabProps>;

// stateful-tabs

interface State {
  activeKey: React.Key;
}

interface Action {
  type: typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE];
  payload: React.Key;
}

type StateReducer = (state: State, action: Action) => State;

type StatefulTabsProps = TabsProps & {
  initialState?: State;
  stateReducer?: StateReducer;
};

export declare const StatefulTabs: React.FC<StatefulTabsProps>;
