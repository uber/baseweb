/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Avatar} from '../index.js';

export const name = 'avatar-custom-initials';

export const component = () => (
  <Avatar name="Product - Marketplace" initials="PM" />
);
