/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { StatefulPhoneInput } from '../index';

export function Scenario() {
  return (
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
}
