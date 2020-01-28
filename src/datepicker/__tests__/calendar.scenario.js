/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Calendar} from '../index.js';

export const name = 'calendar';

export const component = () => (
  <Calendar highlightedDate={new Date('2019-02-22T10:00:00Z')} />
);
