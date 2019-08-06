/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Checkbox} from '../index.js';

export const name = 'checkbox';

export const component = () => (
  <React.Fragment>
    <Checkbox>basic</Checkbox>
    <br />
    <Checkbox checked>checked</Checkbox>
    <br />
    <Checkbox isError>error</Checkbox>
    <br />
    <Checkbox isError checked>
      error checked
    </Checkbox>
    <br />
    <Checkbox disabled>disabled</Checkbox>
    <br />
    <Checkbox disabled checked>
      disabled checked
    </Checkbox>
    <br />
    <Checkbox isIndeterminate>indeterminate</Checkbox>
  </React.Fragment>
);
