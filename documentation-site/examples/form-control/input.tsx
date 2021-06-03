import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';

export default function Example() {
  const [value, setValue] = React.useState('');
  return (
    <FormControl label="Input label" caption="Input caption">
      <Input
        id="input-id"
        value={value}
        onChange={event => setValue(event.currentTarget.value)}
      />
    </FormControl>
  );
}
