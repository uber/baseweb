import * as React from 'react';
import {Input} from 'baseui/input';

function ControlledInput() {
  const [value, setValue] = React.useState('');
  return (
    <Input
      onChange={event =>
        setValue((event.target as HTMLInputElement).value)
      }
      placeholder="Controlled Input"
      value={value}
    />
  );
}
