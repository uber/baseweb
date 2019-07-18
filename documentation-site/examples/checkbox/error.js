// @flow
import * as React from 'react';
import {StatefulCheckbox} from 'baseui/checkbox';

export default () => (
  <StatefulCheckbox onChange={console.log} isError>
    Checkbox with an error
  </StatefulCheckbox>
);
