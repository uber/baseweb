/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

export type LayersManagerPropsT = {
  children: React.Node,
};

export type LayersContexT = {
  root: ?HTMLElement, 
  host: ?HTMLElement
};

export type LayerPropsT = {
  children: React.Node,
  host?: ?HTMLElement,
  index?: number,
  mountNode?: HTMLElement,
  onMount?: () => mixed,
  onUnmount?: () => mixed,
};

export type LayerComponentPropsT = {
  children: React.Node,
  host: ?HTMLElement,
  index?: number,
  mountNode?: HTMLElement,
  onMount?: () => mixed,
  onUnmount?: () => mixed,
};

export type LayerStateT = {
  container: ?HTMLElement,
};
