/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {StatefulPhoneInputNext} from '../index.js';

export default function Scenario() {
  return (
    <StatefulPhoneInputNext
      overrides={{
        CountrySelectDropdownListItem: {
          props: {'data-e2e': 'country-picker-list-item'},
        },
        FlagContainer: {
          props: {'data-e2e': 'country-flag'},
        },
        DialCode: {
          props: {'data-e2e': 'phone-input-dialcode'},
        },
      }}
    />
  );
}
