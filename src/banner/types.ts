/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { OverrideT } from '../helpers/overrides';
import { ACTION_POSITION, ARTWORK_TYPE, HIERARCHY, KIND } from './constants';

import type { SyntheticEvent } from 'react';

export type ActionPositionT = typeof ACTION_POSITION[keyof typeof ACTION_POSITION];
export type ArtworkTypeT = typeof ARTWORK_TYPE[keyof typeof ARTWORK_TYPE];
export type HierarchyT = typeof HIERARCHY[keyof typeof HIERARCHY];
export type KindT = typeof KIND[keyof typeof KIND];

export type ActionContentT = {
  // Text shown within action button or applied to aria label.
  label: string;
  // If provided renders this icon instead of the text label.
  icon?: (a: { size: string }) => React.ReactNode;
  // Called when action button is activated.
  onClick: (a: SyntheticEvent<HTMLButtonElement>) => unknown;
  // Determines if action button is positioned trailing message or below.
  position?: ActionPositionT;
};

export type ArtworkContentT = {
  // Element displayed, usually an icon.
  icon: (a: { size: string }) => React.ReactNode;
  // Determines artwork size. Icon for graphics with a strong silhouette or badge for more nuance.
  type?: ArtworkTypeT;
};

export type PropsT = {
  // Provide a method to "accept", "dismiss", or otherwise interact with the message shown.
  action?: ActionContentT;
  // Visually convey the message text.
  artwork?: ArtworkContentT;
  // Message to display.
  children: React.ReactNode;
  // Determines message priority by rendering in pale or saturated colors.
  hierarchy?: HierarchyT;
  // Determines color scheme and conveys message intent.
  kind?: KindT;
  overrides?: {
    BelowContent?: OverrideT;
    LeadingContent?: OverrideT;
    Message?: OverrideT;
    MessageContent?: OverrideT;
    Root?: OverrideT;
    Title?: OverrideT;
    TrailingContent?: OverrideT;
    TrailingButtonContainer?: OverrideT;
    TrailingIconButton?: OverrideT;
  };
  // Used to make the banner visually distinct from its container element.
  nested?: boolean;
  // Bold text displayed when message content should be separated to two lines.
  title?: React.ReactNode;
};
