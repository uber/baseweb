/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { Theme } from '../styles/types';
import type { Override } from '../helpers/overrides';

export type BaseProviderOverrides = {
  AppContainer?: Override;
  LayersContainer?: Override;
};

export type BaseProviderProps = {
  /** Children element to be rendered. Normally the BaseProvider
   should be added at the top level of an application. */
  children: React.ReactNode | undefined | null;
  overrides?: BaseProviderOverrides;
  /** The base theme to be used in the application. */
  theme: Theme;
  /** A value of z-index to be set on the layers. */
  zIndex?: number;
};
