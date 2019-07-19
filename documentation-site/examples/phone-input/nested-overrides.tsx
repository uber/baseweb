import React from 'react';
import {StatefulPhoneInput} from 'baseui/phone-input';

export default () => (
  <StatefulPhoneInput
    overrides={{
      Input: {
        props: {
          overrides: {
            Root: {
              style: {
                width: '300px',
              },
            },
          },
        },
      },
    }}
  />
);
