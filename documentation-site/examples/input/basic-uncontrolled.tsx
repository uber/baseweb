import * as React from 'react';
import {StatefulInput} from 'spaceweb/input';

export default () => (
  <StatefulInput
    initialState={{value: 'I manage my own state...'}}
    placeholder="I manage my own state..."
  />
);
