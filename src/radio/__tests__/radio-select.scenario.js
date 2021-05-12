/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulRadioGroup, Radio, ALIGN} from '../index.js';

import {FormControl} from '../../form-control/index.js';
import {Select} from '../../select/index.js';

export default function Scenario() {
  return (
    <FormControl label="Test-label">
      <StatefulRadioGroup name="number" align={ALIGN.vertical}>
        <Radio value="1">One</Radio>
        <Radio value="2" description="This is a radio description">
          Two
        </Radio>
        <Radio value="3">Three</Radio>
        <Radio
          value="4"
          description="This one has a Select that only works with keyboard"
          containsInteractiveElement
        >
          <Select placeholder="Select color" />
        </Radio>
      </StatefulRadioGroup>
    </FormControl>
  );
}
