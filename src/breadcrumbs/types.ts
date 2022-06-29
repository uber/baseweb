/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import type { ReactNode } from 'react';

import type { Override } from '../helpers/overrides';

export type BreadcrumbsOverrides = {
  Root?: Override;
  Separator?: Override;
  List?: Override;
  ListItem?: Override;
  Icon?: Override;
};

export type BreadcrumbsProps = {
  children?: ReactNode;
  overrides?: BreadcrumbsOverrides;
  ariaLabel?: string;
  'aria-label'?: string;
  /** Whether to show a trailing separator after the last breadcrumb. */
  showTrailingSeparator?: boolean;
};
