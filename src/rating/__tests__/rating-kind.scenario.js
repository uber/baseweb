/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StarRating, KIND} from '../index.js';

export function Scenario() {
  const [value, setValue] = React.useState(3);
  return (
    <div>
      <StarRating
        size={30}
        value={value}
        onChange={({value: v}) => setValue(v)}
      />

      <br />

      <StarRating
        value={value}
        onChange={({value: v}) => setValue(v)}
        kind={KIND.primary}
      />

      <br />

      <StarRating
        value={value}
        onChange={({value: v}) => setValue(v)}
        kind={KIND.secondary}
      />
    </div>
  );
}
