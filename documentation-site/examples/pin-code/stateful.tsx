import React from 'react';
import {StatefulPinCode} from 'spaceweb/pin-code';

export default () => {
  return (
    <StatefulPinCode
      initialState={{values: ['', '', '', '']}}
      onChange={console.log}
    />
  );
};
