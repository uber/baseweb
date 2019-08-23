/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulPhoneInput} from '../index.js';

export const name = 'phone-input';

export const component = () => (
  <StatefulPhoneInput
    overrides={{
      //we need this overrides for `phone-input.e2e.js`
      CountrySelectDropdownListItem: {
        props: {
          'data-e2e': 'country-select-list-item',
        },
      },
      DialCode: {
        props: {
          'data-e2e': 'phone-input-dialcode',
        },
      },
      CountrySelect: {
        props: {
          overrides: {
            SingleValue: {
              props: {
                'data-e2e': 'country-flag-container',
              },
            },
          },
        },
      },
    }}
  />
);
