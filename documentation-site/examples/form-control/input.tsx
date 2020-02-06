import * as React from 'react';
import {FormControl} from 'spaceweb/form-control';
import {Input} from 'spaceweb/input';

export default () => {
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
};
