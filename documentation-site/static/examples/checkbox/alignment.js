import React from 'react';
import {StatefulCheckbox} from 'baseui/checkbox';

export default () => (
  <React.Fragment>
    <StatefulCheckbox onChange={console.log} labelPlacement="left">
      Label on the left
    </StatefulCheckbox>
    <StatefulCheckbox onChange={console.log} labelPlacement="bottom">
      Label on the bottom
    </StatefulCheckbox>
  </React.Fragment>
);
