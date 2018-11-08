/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides';

export type FormControlPropsT = {
  overrides: {
    Label?: OverrideT<*>,
    Caption?: OverrideT<*>,
  },
  label: ?(React.Node | ((props: {}) => React.Node)),
  caption: ?(React.Node | ((props: {}) => React.Node)),
  error: boolean | React.Node | ((props: {}) => React.Node),
  children: React.Node,
};
