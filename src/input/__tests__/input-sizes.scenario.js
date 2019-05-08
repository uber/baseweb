/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulInput, SIZE} from '../index.js';

export const name = 'input-sizes';

export const component = () => (
  <>
    <StatefulInput
      size={SIZE.compact}
      placeholder="Compact"
      endEnhancer=".com"
    />
    <br />
    <StatefulInput placeholder="Default" endEnhancer=".com" />
    <br />
    <StatefulInput size={SIZE.large} placeholder="Large" endEnhancer=".com" />
  </>
);
