import React from 'react';
import {Button, SIZE} from 'baseui/button';
import {Block} from 'baseui/block';

export default () => (
  <React.Fragment>
    <Button size={SIZE.default}>Default size</Button>
    <Block marginBottom="scale300" />
    <Button size={SIZE.compact}>Compact size</Button>
  </React.Fragment>
);
