/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulPinCode} from '../index.js';

export function Scenario() {
  return (
    <>
      <StatefulPinCode
        overrides={{
          Root: {
            style: {
              display: 'flex',
              backgroundColor: 'orange',
            },
          },

          Input: {
            props: {
              overrides: {
                InputContainer: {
                  style: {
                    borderLeftColor: 'turquoise',
                    borderRightColor: 'turquoise',
                    borderTopColor: 'turquoise',
                    borderBottomColor: 'turquoise',
                  },
                },

                Input: {
                  style: {
                    backgroundColor: 'pink',
                  },
                },
              },
            },
          },
        }}
      />
    </>
  );
}
