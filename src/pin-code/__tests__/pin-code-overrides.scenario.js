/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulPinCode} from '../index.js';

export const name = 'pin-code-overrides';

export const component = () => (
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
                  borderColor: 'turquoise',
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
