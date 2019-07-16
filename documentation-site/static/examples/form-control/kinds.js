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
