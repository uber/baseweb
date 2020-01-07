/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {Property} from './common.js';

export function Grid() {
  return (
    <React.Fragment>
      <Property title="columns" value="4, 8, 12"></Property>
      <Property title="gutters" value="16px, 36px, 36px"></Property>
      <Property title="margins" value="16px, 36px, 64px"></Property>
      <Property title="gaps" value="0"></Property>
      <Property title="maxWidth" value="1280px"></Property>
    </React.Fragment>
  );
}
