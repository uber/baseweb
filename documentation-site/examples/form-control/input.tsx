import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {StatefulInput} from 'baseui/input';

export default () => (
  <FormControl label="Input label" caption="Input caption">
    <StatefulInput id="input-id" />
  </FormControl>
);
