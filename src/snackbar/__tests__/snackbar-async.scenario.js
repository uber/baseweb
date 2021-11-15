/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import {SnackbarProvider, useSnackbar, DURATION} from '../index.js';

function Child() {
  const {enqueue} = useSnackbar();

  async function handleClick() {
    await Promise.resolve();

    let i = 0;
    enqueue({message: ++i});
    enqueue({message: ++i});
    enqueue({message: ++i});
    enqueue({message: ++i});
    enqueue({message: ++i});
  }

  return (
    <div>
      <button data-testid="queue-one" onClick={handleClick}>
        enqueue
      </button>
    </div>
  );
}

export default function Parent() {
  return (
    <SnackbarProvider
      overrides={{
        Root: {props: {'data-testid': 'snackbar-root'}},
      }}
      defaultDuration={DURATION.short}
    >
      <Child />
    </SnackbarProvider>
  );
}
