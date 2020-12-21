// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';

export default function Example() {
  return (
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
}
