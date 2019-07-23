// @flow
import React from 'react';
import {StatefulPinCode} from 'baseui/pin-code';

export default function() {
  return (
    <React.Fragment>
      <StatefulPinCode manageFocus={false} />
    </React.Fragment>
  );
}
