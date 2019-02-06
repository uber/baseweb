import React from 'react';
import {FormControl} from 'baseui/form-control';
import {StatefulInput, SIZE} from 'baseui/input';
import {StatefulTextarea} from 'baseui/textarea';
import {StatefulCheckbox} from 'baseui/checkbox';
import {StatefulRadioGroup, StyledRadio} from 'baseui/radio';

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
    <FormControl label="RadioGroup label" caption="RadioGroup caption">
      <StatefulRadioGroup>
        <StyledRadio value="red">Red</StyledRadio>
        <StyledRadio value="green">Green</StyledRadio>
        <StyledRadio value="blue">Blue</StyledRadio>
      </StatefulRadioGroup>
    </FormControl>
  </React.Fragment>
);
