// @flow
import React from 'react';
import {StatefulPinCode} from 'baseui/pin-code';

export default function() {
  return (
    <React.Fragment>
      <StatefulPinCode size="compact" />
      <br />
      <StatefulPinCode />
      <br />
      <StatefulPinCode size="large" />
    </React.Fragment>
  );
}
