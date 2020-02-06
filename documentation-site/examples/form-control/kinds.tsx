import * as React from 'react';
import {FormControl} from 'spaceweb/form-control';
import {Input} from 'spaceweb/input';

export default () => (
  <React.Fragment>
    <FormControl label="Input label" caption="Input caption">
      <Input />
    </FormControl>
    <FormControl
      positive="Positive caption"
      label="Input label"
      caption="Input caption"
    >
      <Input positive />
    </FormControl>
    <FormControl
      error="Error caption"
      label="Input label"
      caption="Input caption"
    >
      <Input error />
    </FormControl>
  </React.Fragment>
);
