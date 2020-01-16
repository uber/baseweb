/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import type {OverrideT} from '../helpers/overrides.js';
import {ARTWORK_SIZES} from './constants.js';

export type ArtworkSizesT =
  | typeof ARTWORK_SIZES.SMALL
  | typeof ARTWORK_SIZES.MEDIUM
  | typeof ARTWORK_SIZES.LARGE;

export type StyledArtworkContainerPropsT = {$artworkSize: ArtworkSizesT};
export type StyledContentPropsT = {$mLeft: boolean, $sublist: boolean};

export type OverridesT = {|
  Root?: OverrideT<{}>,
  ArtworkContainer?: OverrideT<StyledArtworkContainerPropsT>,
  Content?: OverrideT<StyledContentPropsT>,
  EndEnhancerContainer?: OverrideT<{}>,
|};

export type PropsT = {|
  artwork?: React.ComponentType<{size: number}>,
  artworkSize?: ArtworkSizesT,
  children: React.Node,
  endEnhancer?: React.ComponentType<{}>,
  overrides?: OverridesT,
  sublist?: boolean,
|};

export type LabelPropsT = {|
  children: React.Node,
  description?: React.Node,
  sublist?: boolean,
|};

export type MenuAdapterPropsT = {
  ...PropsT,
  // eslint-disable-next-line flowtype/no-weak-types
  item: any,
  onMouseEnter: MouseEvent => mixed,
  onClick: MouseEvent => mixed,
  $size: string,
  $isHighlighted: boolean,
  $disabled: boolean,
};
