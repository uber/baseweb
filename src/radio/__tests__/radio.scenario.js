/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulRadioGroup, StyledRadio} from '../index.js';

export const name = 'radio';

export const component = () => (
  <StatefulRadioGroup initialState={{value: '2'}} ariaLabel="choose item">
    <StyledRadio value="1">First</StyledRadio>
    <StyledRadio value="2">Second</StyledRadio>
    <StyledRadio value="3">Third</StyledRadio>
  </StatefulRadioGroup>
);
