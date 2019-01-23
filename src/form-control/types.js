/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';

export type FormControlPropsT = {
  overrides: {
    /** Customizes the label element. */
    Label?: OverrideT<*>,
    /** Customizes the caption element. */
    Caption?: OverrideT<*>,
    /** Customizes the container element. */
    ControlContainer?: OverrideT<*>,
  },
  /** A label rendered above the input field. */
  label: ?(React.Node | ((props: {}) => React.Node)),
  /** A caption rendered below the input field. */
  caption: ?(React.Node | ((props: {}) => React.Node)),
  /** Error state of the input. If an error prop passed it will be rendered in place of caption as an error message. */
  error: boolean | React.Node | ((props: {}) => React.Node),
  children: React.Node,
};
