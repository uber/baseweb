/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { PropsWithChildren } from 'react';
import type { Override } from '../helpers/overrides';

export type HeaderNavigationOverrides = {
  Root?: Override;
};

export type HeaderNavigationProps = PropsWithChildren<{
  overrides: HeaderNavigationOverrides;
}>;
