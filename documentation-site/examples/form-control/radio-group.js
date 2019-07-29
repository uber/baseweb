// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {StatefulRadioGroup, Radio} from 'baseui/radio';

export default () => (
  <FormControl
    label="RadioGroup label"
    caption="RadioGroup caption"
  >
    <StatefulRadioGroup>
      <Radio value="red">Red</Radio>
      <Radio value="green">Green</Radio>
      <Radio value="blue">Blue</Radio>
    </StatefulRadioGroup>
  </FormControl>
);
