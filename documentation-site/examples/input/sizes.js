// @flow
import React from 'react';
import {Block} from 'baseui/block';
import {StatefulInput, SIZE} from 'baseui/input';

export default () => (
  <Block>
    <StatefulInput size={SIZE.compact} placeholder="compact" />
    <Block as="br" />
    <StatefulInput size={SIZE.default} placeholder="default" />
    <Block as="br" />
    <StatefulInput size={SIZE.large} placeholder="large" />
  </Block>
);
