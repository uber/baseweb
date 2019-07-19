// @flow
import React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {StatefulPinCode} from 'baseui/pin-code';

export default function() {
  const [showPinCode, toggle] = React.useState(false);
  return (
    <Block display="flex">
      <Button onClick={() => toggle(s => !s)}>Mount PinCode</Button>
      <Block marginLeft="scale300" />
      {showPinCode ? <StatefulPinCode autoFocus /> : null}
    </Block>
  );
}
