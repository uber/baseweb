/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { SyntheticEvent } from 'react';
import type { Override } from '../helpers/overrides';
import { KIND } from '../button';
import { BACKGROUND_COLOR_TYPE, IMAGE_LAYOUT, OBJECT_FIT } from './constants';

export type MessageCardOverrides = {
  Root?: Override;
  ContentContainer?: Override;
  HeadingContainer?: Override;
  ParagraphContainer?: Override;
  Button?: Override;
  Image?: Override;
};

export interface MessageCardProps {
  onClick: (a: SyntheticEvent<HTMLButtonElement>) => unknown;
  heading?: string;
  paragraph?: string;
  buttonLabel?: string;
  buttonKind?: keyof typeof KIND;
  backgroundColor?: string;
  backgroundColorType?: keyof typeof BACKGROUND_COLOR_TYPE;
  image?: {
    src: string;
    layout?: keyof typeof IMAGE_LAYOUT;
    objectFit?: keyof typeof OBJECT_FIT;
  };
  overrides?: MessageCardOverrides;
}
