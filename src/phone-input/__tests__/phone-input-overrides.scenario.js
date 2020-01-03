/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulPhoneInput} from '../index.js';

export const name = 'phone-input-overrides';

export const component = () => (
  <StatefulPhoneInput
    overrides={{
      Input: {
        props: {
          overrides: {
            InputContainer: {
              style: {
                backgroundColor: 'orange',
              },
            },
          },
        },
      },
      CountrySelect: {
        props: {
          overrides: {
            ControlContainer: {
              style: {
                backgroundColor: 'pink',
              },
            },
          },
        },
      },
    }}
  />
);
