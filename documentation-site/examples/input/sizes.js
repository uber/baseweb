// @flow
import React from 'react';
import {StatefulInput, SIZE} from 'baseui/input';

export default () => (
  <div>
    <StatefulInput size={SIZE.compact} placeholder="compact" />
    <br />
    <StatefulInput size={SIZE.default} placeholder="default" />
    <br />
    <StatefulInput size={SIZE.large} placeholder="large" />
  </div>
);
