/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Override } from '../helpers/overrides';

export type NavItemOverrides = {
  Title?: Override;
  Selector?: Override;
  Panel?: Override;
};

export type NavigationBottomOverrides = {
  Root?: Override;
  SelectorList?: Override;
  OverflowPanel?: Override;
  OverflowPanelList?: Override;
  OverflowTitle?: Override;
  OverflowSelector?: Override;
};

export type Icon = React.ComponentType<
  {
    size: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } & any
>;

export type NavItemProps = {
  children?: React.ReactNode;
  title: string;
  icon?: Icon;
  overrides?: NavItemOverrides;
};

export type SelectorProps = {
  title: string;
  icon: Icon;
  isActive: boolean;
  onChange: OnChange;
  overrides: NavItemOverrides;
};

export type PanelProps = {
  isActive: boolean;
  overrides: NavItemOverrides;
  children: React.ReactNode;
};

export type OnChange = (params: { activeKey: React.Key }) => void;

export interface NavigationBottomProps {
  children?: React.ReactNode;
  activeKey?: React.Key;
  onChange?: OnChange;
  overrides?: NavigationBottomOverrides;
}
