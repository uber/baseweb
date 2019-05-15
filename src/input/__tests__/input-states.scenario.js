/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulInput} from '../index.js';

export const name = 'input-states';

export const component = () => (
  <React.Fragment>
    <StatefulInput initialState={{value: 'default'}} />
    <br />
    <StatefulInput initialState={{value: 'error'}} error />
    <br />
    <StatefulInput initialState={{value: 'disabled'}} disabled />
  </React.Fragment>
);
