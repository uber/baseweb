/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';
import {MaskedInput} from '../index.js';

export default function Scenario() {
  const [value, setValue] = React.useState('20000101');
  return (
    <MaskedInput
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
      mask="9999/99/99"
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}
