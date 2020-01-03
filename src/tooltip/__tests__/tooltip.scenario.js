/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulTooltip} from '../index.js';

export const name = 'tooltip';

export const component = () => (
  <StatefulTooltip
    accessibilityType={'tooltip'}
    content="Tooltips display short messages."
  >
    <span>such as this</span>
  </StatefulTooltip>
);
