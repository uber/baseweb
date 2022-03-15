/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { Checkbox } from '../index.js';

export function Scenario() {
  return (
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
      <Checkbox error>Checkbox error</Checkbox>
      <Checkbox error checked>
        Checkbox error checked
      </Checkbox>
      <Checkbox error isIndeterminate>
        Checkbox error isIndeterminate
      </Checkbox>
    </React.Fragment>
  );
}
