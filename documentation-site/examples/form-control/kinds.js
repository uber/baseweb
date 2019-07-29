// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {StatefulInput} from 'baseui/input';

export default () => (
  <React.Fragment>
    <FormControl label="Input label" caption="Input caption">
      <StatefulInput />
    </FormControl>

    <FormControl
      positive="Positive caption"
      label="Input label"
      caption="Input caption"
    >
      <StatefulInput positive />
    </FormControl>

    <FormControl
      error="Error caption"
      label="Input label"
      caption="Input caption"
    >
      <StatefulInput error />
    </FormControl>
  </React.Fragment>
);
