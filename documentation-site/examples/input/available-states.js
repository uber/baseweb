// @flow
import * as React from 'react';
import {StatefulInput} from 'baseui/input';

export default () => (
  <div>
    <StatefulInput placeholder="simple" />
    <br />
    <StatefulInput initialState={{value: 'uber'}} />
    <br />
    <StatefulInput placeholder="Input in an error state" error />
    <br />
    <StatefulInput
      placeholder="Input in an positive state"
      positive
    />
    <br />
    <StatefulInput placeholder="Disabled input" disabled />
  </div>
);
