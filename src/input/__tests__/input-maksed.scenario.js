/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import MaskedInput from '../masked-input.js';

export const name = 'input-masked';

export const component = () => (
  <MaskedInput placeholder="Phone number" mask="(999) 999-9999" />
);
