import * as React from 'react';
import {Input} from 'spaceweb/input';

export default () => {
  const [value, setValue] = React.useState('');
  return (
    <Input
      value={value}
      onChange={event => setValue(event.currentTarget.value)}
      placeholder="Controlled Input"
    />
  );
};
