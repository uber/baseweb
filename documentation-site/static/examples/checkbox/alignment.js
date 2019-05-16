import * as React from 'react';
import {StatefulCheckbox} from 'baseui/checkbox';

export default () => (
  <React.Fragment>
    <StatefulCheckbox onChange={console.log} labelPlacement="top">
      Label on the top
    </StatefulCheckbox>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '8px 0px 8px 12px',
      }}
    >
      <StatefulCheckbox onChange={console.log} labelPlacement="left">
        Label on the left
      </StatefulCheckbox>
      <StatefulCheckbox onChange={console.log} labelPlacement="right">
        Label on the right
      </StatefulCheckbox>
    </div>
    <StatefulCheckbox onChange={console.log} labelPlacement="bottom">
      Label on the bottom
    </StatefulCheckbox>
  </React.Fragment>
);
