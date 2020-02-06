import * as React from 'react';
import {FormControl} from 'spaceweb/form-control';
import {Textarea} from 'spaceweb/textarea';

export default () => {
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
};
