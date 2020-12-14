import React from 'react';
import {StatefulPinCode} from 'baseui/pin-code';

export default function Example() {
  return (
    <StatefulPinCode
      initialState={{values: ['', '', '', '']}}
      onChange={console.log}
    />
  );
}
