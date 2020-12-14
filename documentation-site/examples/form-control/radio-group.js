// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {RadioGroup, Radio} from 'baseui/radio';

export default function Example() {
  const [value, setValue] = React.useState('');
  return (
    <FormControl
      label="RadioGroup label"
      caption="RadioGroup caption"
    >
      <RadioGroup
        value={value}
        onChange={event => setValue(event.currentTarget.value)}
      >
        <Radio value="red">Red</Radio>
        <Radio value="green">Green</Radio>
        <Radio value="blue">Blue</Radio>
      </RadioGroup>
    </FormControl>
  );
}
