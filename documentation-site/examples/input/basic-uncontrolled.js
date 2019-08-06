// @flow
import * as React from 'react';
import {StatefulInput} from 'baseui/input';

export default () => (
  <StatefulInput
    initialState={{value: 'I manage my own state...'}}
    placeholder="I manage my own state..."
  />
);
