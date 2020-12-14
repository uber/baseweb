// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {Textarea} from 'baseui/textarea';

export default function Example() {
  const [value, setValue] = React.useState('');
  return (
    <FormControl label="Textarea label" caption="Textarea caption">
      <Textarea
        id="textarea-id"
        value={value}
        onChange={event => setValue(event.currentTarget.value)}
      />
    </FormControl>
  );
}
