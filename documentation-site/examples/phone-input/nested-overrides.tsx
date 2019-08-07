import React from 'react';
import {StatefulPhoneInput} from 'baseui/phone-input';

export default () => (
  <StatefulPhoneInput
    enableFiltering
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
      FilterInput: {
        props: {
          overrides: {
            Before: {
              style: {
                backgroundColor: 'salmon',
              },
            },
          },
        },
      },
    }}
  />
);
