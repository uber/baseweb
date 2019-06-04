import React from 'react';
import {StatefulPhoneInput, COUNTRIES} from 'baseui/phone-input';

export default () => (
  <StatefulPhoneInput
    initialState={{
      text: '',
      country: COUNTRIES.RO,
    }}
  />
);
