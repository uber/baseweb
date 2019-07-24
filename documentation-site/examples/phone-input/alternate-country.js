// @flow
import React from 'react';
import {StatefulPhoneInput, COUNTRIES} from 'baseui/phone-input';

export default () => (
  <StatefulPhoneInput
    initialState={{
      country: COUNTRIES.RO,
    }}
  />
);
