/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import Upload from '../../icon/upload.js';

import {SnackbarProvider, useSnackbar, DURATION} from '../index.js';

function Child() {
  const {enqueue} = useSnackbar();

  return (
    <div>
      <button
        onClick={() =>
          enqueue({
            message: '09.06.2020.CSV was uploaded',
            startEnhancer: ({size}) => <Upload size={size} />,
            actionMessage: 'Show in Finder',
          })
        }
      >
        enqueue provider overrides
      </button>
    </div>
  );
}

export default function Parent() {
  return (
    <SnackbarProvider
      overrides={{
        Root: {
          style: {border: 'solid 1px green'},
        },
        StartEnhancer: {
          style: {border: 'solid 1px blue'},
        },
        Content: {
          style: {border: 'solid 1px red'},
        },
        Action: {
          style: {border: 'solid 1px orange'},
        },
      }}
    >
      <Child />
    </SnackbarProvider>
  );
}
