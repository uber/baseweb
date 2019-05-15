import React from 'react';
import {StatefulInput} from 'baseui/input';

export default () => (
  <StatefulInput
    initialState={{
      value: 'Default Value',
    }}
    placeholder="Uncontrolled Input"
  />
);
