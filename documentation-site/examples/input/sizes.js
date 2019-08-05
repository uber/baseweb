// @flow
import React from 'react';
import {Input, SIZE} from 'baseui/input';

export default () => (
  <React.Fragment>
    <Input size={SIZE.compact} placeholder="compact" />
    <br />
    <Input placeholder="default" />
    <br />
    <Input size={SIZE.large} placeholder="large" />
  </React.Fragment>
);
