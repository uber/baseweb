/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {Checkbox} from '../index.js';

export const name = 'checkbox-states';

export const component = () => (
  <React.Fragment>
    <Checkbox>Checkbox</Checkbox>
    <Checkbox checked>Checkbox checked</Checkbox>
    <Checkbox isIndeterminate>Checkbox isIndeterminate</Checkbox>
    <Checkbox disabled>Checkbox disabled</Checkbox>
    <Checkbox disabled checked>
      Checkbox disabled checked
    </Checkbox>
    <Checkbox disabled isIndeterminate>
      Checkbox disabled isIndeterminate
    </Checkbox>
    <Checkbox isError>Checkbox isError</Checkbox>
    <Checkbox isError checked>
      Checkbox isError checked
    </Checkbox>
    <Checkbox isError isIndeterminate>
      Checkbox isError isIndeterminate
    </Checkbox>
  </React.Fragment>
);
