import React from 'react';
import {StatefulCheckbox} from 'baseui/checkbox';

export default () => (
  <React.Fragment>
    <StatefulCheckbox onChange={console.log} disabled>
      Disabled checkbox
    </StatefulCheckbox>
    <StatefulCheckbox
      onChange={console.log}
      disabled
      initialState={{checked: true}}
    >
      Disabled checkbox (checked)
    </StatefulCheckbox>
  </React.Fragment>
);
