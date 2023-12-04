/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Override } from '../helpers/overrides';
import type { TILE_KIND, TILE_GROUP_KIND, ALIGNMENT } from './constants';

export type TileOverrides = {
  Root?: Override;
  HeaderContainer?: Override;
  BodyContainer?: Override;
  BodyContainerContent?: Override;
  LeadingContent?: Override;
  TrailingContent?: Override;
  Label?: Override;
  ContentBody?: Override;
};

export type TileKind = keyof typeof TILE_KIND;

export type TileGroupOverrides = {
  Root?: Override;
  Toggle?: Override;
  ToggleTrack?: Override;
  Checkmark?: Override;
  RadioMarkOuter?: Override;
  RadioMarkInner?: Override;
};

export type TileGroupProps = {
  ariaLabel?: string;
  kind?: keyof typeof TILE_GROUP_KIND;
  disabled?: boolean;
  onClick?: (
    event: React.SyntheticEvent<HTMLButtonElement> | React.KeyboardEvent,
    index: number
  ) => unknown;
  selected?: number | Array<number>;
  children: React.ReactNode;
  overrides?: TileGroupOverrides;
};

export type TileProps = {
  tileKind: TileKind;
  children?: React.ReactNode;
  label?: string | React.ComponentType;
  leadingContent?: React.ComponentType;
  trailingContent?: React.ComponentType;
  headerAlignment?: keyof typeof ALIGNMENT;
  bodyAlignment?: keyof typeof ALIGNMENT;
  disabled?: boolean;
  selected?: boolean;
  onClick?: (a: React.SyntheticEvent<HTMLButtonElement>) => unknown;
  overrides?: TileOverrides;
};
