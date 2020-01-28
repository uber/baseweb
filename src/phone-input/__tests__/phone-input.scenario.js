/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulPhoneInput, PhoneInputLite} from '../index.js';

export const name = 'phone-input';

export const component = () => (
  <>
    <StatefulPhoneInput
      overrides={{
        CountrySelectDropdownListItem: {
          props: {'data-e2e': 'country-select-list-item'},
        },
        FlagContainer: {
          props: {'data-e2e': 'country-flag'},
        },
        DialCode: {
          props: {'data-e2e': 'phone-input-dialcode'},
        },
      }}
    />

    <br />
    <p>phone input lite</p>
    <PhoneInputLite
      country={{label: 'Afghanistan (‫افغانستان‬‎)', id: 'AF', dialCode: '+93'}}
      countries={{
        AF: {label: 'Afghanistan (‫افغانستان‬‎)', id: 'AF', dialCode: '+93'},
        AL: {label: 'Albania (Shqipëri)', id: 'AL', dialCode: '+355'},
        DZ: {label: 'Algeria (‫الجزائر‬‎)', id: 'DZ', dialCode: '+213'},
        AS: {label: 'American Samoa', id: 'AS', dialCode: '+1684'},
        AD: {label: 'Andorra', id: 'AD', dialCode: '+376'},
        AO: {label: 'Angola', id: 'AO', dialCode: '+244'},
        AI: {label: 'Anguilla', id: 'AI', dialCode: '+1264'},
      }}
    />
  </>
);
