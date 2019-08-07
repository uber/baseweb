// @flow
import React from 'react';
import {StatefulPinCode} from 'baseui/pin-code';

export default () => {
  return (
    <StatefulPinCode
      initialState={{values: ['', '', '', '']}}
      onChange={console.log}
    />
  );
};
