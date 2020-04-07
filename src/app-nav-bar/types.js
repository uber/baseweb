/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

export type AppNavBarPropsT = {
  appDisplayName?: React.Node,
  appDisplayNameLink?: string,
  // eslint-disable-next-line flowtype/no-weak-types
  mainNav?: Array<any>,
  // eslint-disable-next-line flowtype/no-weak-types
  onNavItemSelect: (params: {item: any}) => mixed,
  // eslint-disable-next-line flowtype/no-weak-types
  userNav?: Array<any>,
  username?: string,
  usernameSubtitle?: React.Node,
  userImgUrl?: string,
};

export type UserMenuPropsT = {
  // eslint-disable-next-line flowtype/no-weak-types
  userNav?: Array<any>,
  username?: string,
  usernameSubtitle?: React.Node,
  userImgUrl?: string,
};
