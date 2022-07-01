/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import { SnackbarProvider, useSnackbar, DURATION, PLACEMENT } from '../index.js';

function Child({ placement }) {
  const { enqueue } = useSnackbar();
  return (
    <div>
      <button onClick={() => enqueue({ message: placement }, DURATION.short)}>one line</button>

      <button
        onClick={() =>
          enqueue(
            {
              message:
                'It seems to me then as if all the moments of our life occupy the same space, as if future events already existed',
            },

            DURATION.medium
          )
        }
      >
        two line
      </button>

      <button
        onClick={() =>
          enqueue(
            {
              message:
                'It seems to me then as if all the moments of our life occupy the same space, as if future events already existed and were only waiting for us to find our way to them at last, just as when we have accepted an invitation we duly arrive in a certain house at a given time.',
              actionMessage: 'A button label much longer than 50%',
            },

            DURATION.long
          )
        }
      >
        three line
      </button>
    </div>
  );
}

export function Scenario() {
  const [placement, setPlacement] = React.useState(PLACEMENT.top);
  return (
    <div>
      <SnackbarProvider placement={placement}>
        <Child placement={placement} />
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select onChange={(event) => setPlacement(event.target.value)} value={placement}>
          {Object.values(PLACEMENT).map((p) => (
            <option key={String(p)} value={p}>
              {String(p)}
            </option>
          ))}
        </select>
      </SnackbarProvider>
    </div>
  );
}
