// @flow
import React from 'react';
import {StatefulPinCode} from 'baseui/pin-code';

const overrides = {
  Input: {
    props: {
      overrides: {
        InputContainer: {
          style: {
            // use longhand CSS properties
            backgroundColor: 'lightgreen',
            borderColor: 'seagreen',
          },
        },
      },
    },
  },
};

export default function() {
  return <StatefulPinCode overrides={overrides} />;
}
