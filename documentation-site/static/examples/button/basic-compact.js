import React from 'react';
import {Button, SIZE} from 'baseui/button';

export default () => (
  <React.Fragment>
    <Button size={SIZE.default}>Default size</Button>
    <Button size={SIZE.compact}>Compact size</Button>
  </React.Fragment>
);
