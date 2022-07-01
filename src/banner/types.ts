/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import type { OverrideT } from '../helpers/overrides.js';
import { ACTION_POSITION, ARTWORK_TYPE, HIERARCHY, KIND } from './constants.js';

export type ActionPositionT = $Values<typeof ACTION_POSITION>;
export type ArtworkTypeT = $Values<typeof ARTWORK_TYPE>;
export type HierarchyT = $Values<typeof HIERARCHY>;
export type KindT = $Values<typeof KIND>;

export type ActionContentT = {|
  // Text shown within action button or applied to aria label.
  label: string,
  // If provided renders this icon instead of the text label.
  icon?: ({ size: string }) => React.Node,
  // Called when action button is activated.
  onClick: (SyntheticEvent<HTMLButtonElement>) => mixed,
  // Determines if action button is positioned trailing message or below.
  position?: ActionPositionT,
|};

export type ArtworkContentT = {|
  // Element displayed, usually an icon.
  icon: ({ size: string }) => React.Node,
  // Determines artwork size. Icon for graphics with a strong silhouette or badge for more nuance.
  type?: ArtworkTypeT,
|};

export type PropsT = {|
  // Provide a method to "accept", "dismiss", or otherwise interact with the message shown.
  action?: ActionContentT,
  // Visually convey the message text.
  artwork?: ArtworkContentT,
  // Message to display.
  children: React.Node,
  // Determines message priority by rendering in pale or saturated colors.
  hierarchy?: HierarchyT,
  // Determines color scheme and conveys message intent.
  kind?: KindT,
  overrides?: {|
    BelowContent?: OverrideT,
    LeadingContent?: OverrideT,
    Message?: OverrideT,
    MessageContent?: OverrideT,
    Root?: OverrideT,
    Title?: OverrideT,
    TrailingContent?: OverrideT,
    TrailingButtonContainer?: OverrideT,
    TrailingIconButton?: OverrideT,
  |},
  // Used to make the banner visually distinct from its container element.
  nested?: boolean,
  // Bold text displayed when message content should be separated to two lines.
  title?: React.Node,
|};
