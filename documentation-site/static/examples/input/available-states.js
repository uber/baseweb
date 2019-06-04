import * as React from 'react';
import {Block} from 'baseui/block';
import {StatefulInput} from 'baseui/input';

export default () => (
  <Block>
    <StatefulInput placeholder="simple" />
    <Block as="br" />
    <StatefulInput initialState={{value: 'uber'}} />
    <Block as="br" />
    <StatefulInput placeholder="Input in an error state" error />
    <Block as="br" />
    <StatefulInput placeholder="Input in an positive state" positive />
    <Block as="br" />
    <StatefulInput placeholder="Disabled input" disabled />
  </Block>
);
