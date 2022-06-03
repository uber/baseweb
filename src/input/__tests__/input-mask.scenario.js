/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';
import { MaskedInput } from '../index.js';

function Instance({ initialValue = '1234', ...props }) {
  const [value, setValue] = React.useState(initialValue);
  return <MaskedInput value={value} onChange={(e) => setValue(e.target.value)} {...props} />;
}

export function Scenario() {
  return (
    <div>
      <Instance mask="(99 99" initialValue="" />
      <Instance mask="(99 99" />
      <Instance mask="/99 99" />
      <Instance mask="+99 99" />
      <Instance mask="(99 99" />
      <Instance mask="-99 99" />
      <Instance mask={'\\a\\999'} />
      <Instance mask={'\\a\\90099 99'} />
      <Instance mask="99/99/9999" initialValue="10202021" />
      <Instance mask="+1 (999) 999-9999" initialValue="01234567891" />
    </div>
  );
}
