import * as React from 'react';
import {FormControl} from 'spaceweb/form-control';
import {RadioGroup, Radio} from 'spaceweb/radio';

export default () => {
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
};
