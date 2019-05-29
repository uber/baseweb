import React from 'react';
import {StatefulPhoneInput, countries} from 'baseui/phone-input';

export default () => (
  <StatefulPhoneInput
    initialState={{
      inputValue: `+${countries.find(c => c.id === 'RO').dialCode} `,
      countryValue: countries.find(c => c.id === 'RO'),
    }}
  />
);
