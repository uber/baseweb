/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Override } from '../helpers/overrides';
import type { SIZE, KIND } from './constants';

export type Size = keyof typeof SIZE;
export type Kind = keyof typeof KIND;

export type PageControlOverrides = {
  Root?: Override;
  Dot?: Override;
};

export type PageControlProps = {
  currentPage: number;
  numPages: number;
  onPageChange?: (a: { nextPage: number }) => unknown;
  kind?: Kind;
  disabled?: boolean;
  'aria-label'?: string;
  overrides?: PageControlOverrides;
};
