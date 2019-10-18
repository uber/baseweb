/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global window */

import React from 'react';
import {StatefulInput} from '../index.js';

export const name = 'input-password';

export const component = () => (
  <form
    onSubmit={event => {
      event.preventDefault();
      window.__e2e__formSubmitted__ = true;
      return false;
    }}
  >
    <StatefulInput
      type="password"
      initialState={{value: '1234'}}
      overrides={{
        Input: {
          props: {
            'data-e2e': 'input',
          },
        },
        MaskToggleButton: {
          props: {
            'data-e2e': 'mask-toggle',
          },
        },
      }}
    />
  </form>
);
