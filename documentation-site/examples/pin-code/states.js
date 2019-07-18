// @flow
import React from 'react';
import {StatefulPinCode} from 'baseui/pin-code';

export default function() {
  return (
    <React.Fragment>
      <StatefulPinCode disabled />
      <br />
      <StatefulPinCode error />
      <br />
      <StatefulPinCode positive />
    </React.Fragment>
  );
}
