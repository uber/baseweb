/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Datepicker } from '..';
import { FormControl } from '../../form-control';

export function Scenario() {
  const [value, setValue] = React.useState(new Date());
  return (
    <div>
      <FormControl label="Datepicker with FormControl" caption="This is a caption">
        <Datepicker value={value} onChange={({ date }) => setValue(date)} />
      </FormControl>
      <FormControl
        label="Datepicker with FormControl with error"
        caption="This is a caption"
        error="This is an error"
      >
        <Datepicker value={value} onChange={({ date }) => setValue(date)} />
      </FormControl>
    </div>
  );
}
