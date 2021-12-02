/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulInput} from '../index.js';

export function Scenario() {
  return (
    <StatefulInput
      clearable
      clearOnEscape={false}
      initialState={{value: 'Thing'}}
      overrides={{
        Input: {
          props: {'data-e2e': 'input'},
        },

        ClearIcon: {
          props: {'data-e2e': 'clear-icon'},
        },
      }}
    />
  );
}
