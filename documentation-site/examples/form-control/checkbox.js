// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {StatefulCheckbox} from 'baseui/checkbox';

export default () => (
  <FormControl label="Checkbox label" caption="Checkbox caption">
    <StatefulCheckbox>Checkbox control</StatefulCheckbox>
  </FormControl>
);
