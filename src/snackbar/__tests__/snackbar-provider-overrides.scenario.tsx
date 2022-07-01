/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import Upload from '../../icon/upload.js';

import { SnackbarProvider, useSnackbar } from '../index.js';

function Child() {
  const { enqueue } = useSnackbar();

  return (
    <div>
      <button
        onClick={() =>
          enqueue({
            message: '09.06.2020.CSV was uploaded',
            startEnhancer: function StartEnhancer({ size }) {
              return <Upload size={size} />;
            },
            actionMessage: 'Show in Finder',
          })
        }
      >
        enqueue provider overrides
      </button>

      <button
        onClick={() =>
          enqueue({
            message: '09.06.2020.CSV was uploaded',
            startEnhancer: function StartEnhancer({ size }) {
              return <Upload size={size} />;
            },
            actionMessage: 'Show in Finder',
            overrides: {
              Message: { style: { border: 'dotted 2px orange' } },
              ActionButtonContainer: { style: { border: 'dotted 2px yellow' } },
            },
          })
        }
      >
        enqueue individual overrides
      </button>
    </div>
  );
}

export function Scenario() {
  return (
    <SnackbarProvider
      overrides={{
        Root: { style: { border: 'solid 2px red' } },
        Content: { style: { border: 'solid 2px blue' } },
        StartEnhancerContainer: { style: { border: 'solid 2px green' } },
        Message: { style: { border: 'solid 2px orange' } },
        WrapActionButtonContainer: { style: { border: 'solid 2px purple' } },
        ActionButtonContainer: { style: { border: 'solid 2px yellow' } },
        PlacementContainer: { style: { border: 'solid 2px cyan' } },
      }}
    >
      <Child />
    </SnackbarProvider>
  );
}
