// @flow
import * as React from 'react';
import {Input} from 'baseui/input';

function ControlledInput() {
  const [value, setValue] = React.useState('');
  return (
    <Input
      onChange={event => setValue(event.target.value)}
      placeholder="Controlled Input"
      value={value}
    />
  );
}

export default ControlledInput;
