import React from 'react';
import {StatefulPinCode} from 'baseui/pin-code';

export default function() {
  return (
    <StatefulPinCode
      ids={['first', 'second', 'third', 'fourth']}
      names={['first', 'second', 'third', 'fourth']}
    />
  );
}
