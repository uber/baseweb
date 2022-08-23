/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { Override } from '../helpers/overrides';
import { ACTION_POSITION, ARTWORK_TYPE, HIERARCHY, KIND } from './constants';

import type { SyntheticEvent } from 'react';

export type ActionPosition = typeof ACTION_POSITION[keyof typeof ACTION_POSITION];
export type ArtworkType = typeof ARTWORK_TYPE[keyof typeof ARTWORK_TYPE];
export type Hierarchy = typeof HIERARCHY[keyof typeof HIERARCHY];
export type Kind = typeof KIND[keyof typeof KIND];

export type ActionContent = {
  // Text shown within action button or applied to aria label.
  label: string;
  // If provided renders this icon instead of the text label.
  icon?: (a: { size: string }) => React.ReactNode;
  // Called when action button is activated.
  onClick: (a: SyntheticEvent<HTMLButtonElement>) => unknown;
  // Determines if action button is positioned trailing message or below.
  position?: ActionPosition;
};

export type ArtworkContent = {
  // Element displayed, usually an icon.
  icon: (a: { size: string }) => React.ReactNode;
  // Determines artwork size. Icon for graphics with a strong silhouette or badge for more nuance.
  type?: ArtworkType;
};

export type BannerOverrides = {
  BelowContent?: Override;
  LeadingContent?: Override;
  Message?: Override;
  MessageContent?: Override;
  Root?: Override;
  Title?: Override;
  TrailingContent?: Override;
  TrailingButtonContainer?: Override;
  TrailingIconButton?: Override;
};

export type BannerProps = {
  // Provide a method to "accept", "dismiss", or otherwise interact with the message shown.
  action?: ActionContent;
  // Visually convey the message text.
  artwork?: ArtworkContent;
  // Message to display.
  children: React.ReactNode;
  // Determines message priority by rendering in pale or saturated colors.
  hierarchy?: Hierarchy;
  // Determines color scheme and conveys message intent.
  kind?: Kind;
  overrides?: BannerOverrides;
  // Used to make the banner visually distinct from its container element.
  nested?: boolean;
  // Bold text displayed when message content should be separated to two lines.
  title?: React.ReactNode;
};
