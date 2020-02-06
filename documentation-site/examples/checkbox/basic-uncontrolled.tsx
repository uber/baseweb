import * as React from 'react';
import {StatefulCheckbox} from 'spaceweb/checkbox';

export default () => (
  <StatefulCheckbox onChange={console.log}>
    click me
  </StatefulCheckbox>
);
