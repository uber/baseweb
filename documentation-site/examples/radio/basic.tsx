import * as React from 'react';
import {Radio, RadioGroup} from 'baseui/radio';

export default () => {
  const [value, setValue] = React.useState('1');
  return (
    <RadioGroup
      name="radio group"
      onChange={e => setValue(e.target.value)}
      value={value}
    >
      <Radio value="1">First</Radio>
      <Radio
        value="2"
        description="This is a radio description, it gives a little more in-yo-face context about what this is."
      >
        Second
      </Radio>
      <Radio value="3">Third</Radio>
    </RadioGroup>
  );
};
