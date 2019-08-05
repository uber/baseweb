// @flow
import React from 'react';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';
import {StatefulPinCode} from 'baseui/pin-code';

export default function() {
  const [useCss, theme] = useStyletron();
  const [showPinCode, toggle] = React.useState(false);
  return (
    <div className={useCss({display: 'flex'})}>
      <Button onClick={() => toggle(s => !s)}>Mount PinCode</Button>
      <div
        className={useCss({marginLeft: theme.sizing.scale300})}
      />
      {showPinCode ? <StatefulPinCode autoFocus /> : null}
    </div>
  );
}
