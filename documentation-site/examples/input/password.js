// @flow
import React from 'react';
import {Input} from 'baseui/input';

export default function Example() {
  const [value, setValue] = React.useState('1234');
  return (
    <Input
      onChange={event => setValue(event.currentTarget.value)}
      type="password"
      value={value}
    />
  );
}
