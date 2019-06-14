/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import type {OverrideT} from '../helpers/overrides.js';

export type AspectRatioBoxComponentsT = {
  Body?: OverrideT<?{}>,
  Root?: OverrideT<?{}>,
};

export type AspectRatioBoxPropsT = {
  /** Aspect ratio is width divided by height. */
  +aspectRatio?: number,
  /** Content to be rendered in the Body. */
  +children?: React.Node,
  +overrides: AspectRatioBoxComponentsT,
};
