/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global window */

import React from 'react';
import { StatefulInput } from '..';

export function Scenario() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // @ts-expect-error
        window.__e2e__formSubmitted__ = true;
        return false;
      }}
    >
      <StatefulInput
        type="password"
        initialState={{ value: '1234' }}
        overrides={{
          Input: {
            props: {
              'data-e2e': 'input',
            },
          },
          MaskToggleButton: () => null,
        }}
      />
    </form>
  );
}
