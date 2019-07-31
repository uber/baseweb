// @flow
import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {StatefulTextarea} from 'baseui/textarea';

export default () => (
  <FormControl label="Textarea label" caption="Textarea caption">
    <StatefulTextarea id="textarea-id" />
  </FormControl>
);
