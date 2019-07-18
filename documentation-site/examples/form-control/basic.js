// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {StatefulInput, SIZE} from 'baseui/input';
import {StatefulTextarea} from 'baseui/textarea';
import {StatefulCheckbox} from 'baseui/checkbox';
import {StatefulRadioGroup, Radio} from 'baseui/radio';

export default () => (
  <React.Fragment>
    <FormControl label="Input label" caption="Input caption">
      <StatefulInput size={SIZE.compact} />
    </FormControl>
    <FormControl label="Textarea label" caption="Textarea caption">
      <StatefulTextarea size={SIZE.compact} />
    </FormControl>
    <FormControl label="Checkbox label" caption="Checkbox caption">
      <StatefulCheckbox>Checkbox control</StatefulCheckbox>
    </FormControl>
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
  </React.Fragment>
);
