/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// import type * as React from 'react';
import type { Override } from '../helpers/overrides';
import type { TYPE } from './constants';

export type Type = keyof typeof TYPE;

export type MobileHeaderOverrides = {
  Root?: Override;
  Title?: Override;
  NavContainer?: Override;
  HeaderButton?: Override;
  ActionButtonsContainer?: Override;
};

export type IconButton =
  | {
      content: React.ElementType;
      onClick: () => void;
      ariaLabel: string;
    }
  | {
      content: string;
      onClick: () => void;
      ariaLabel?: string;
    };

export type MobileHeaderProps = {
  title?: string;
  expanded?: boolean;
  navButton: IconButton;
  actionButtons?: [IconButton?, IconButton?];
  type?: Type;
  overrides?: MobileHeaderOverrides;
};
