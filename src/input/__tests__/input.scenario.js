/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulInput, SIZE} from '../index.js';

export const name = 'input';

export const component = () => (
  <StatefulInput
    aria-label="stateful input example"
    // eslint-disable-next-line jsx-a11y/no-autofocus
    autoFocus={true}
    initialState={{value: 'uber'}}
    startEnhancer="@"
    endEnhancer=".com"
    size={SIZE.compact}
    overrides={{Input: {props: {'data-e2e': 'input'}}}}
  />
);
