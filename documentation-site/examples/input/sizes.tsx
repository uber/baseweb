import React from 'react';
import {Input, SIZE} from 'spaceweb/input';

export default () => (
  <React.Fragment>
    <Input size={SIZE.compact} placeholder="compact" />
    <br />
    <Input placeholder="default" />
    <br />
    <Input size={SIZE.large} placeholder="large" />
  </React.Fragment>
);
