import * as React from 'react';
import {Button, KIND} from 'baseui/button';
import {Block} from 'baseui/block';

export default () => (
  <React.Fragment>
    <Button>No state</Button>
    <Block as="span" marginLeft="scale300" />
    <Button isLoading>Loading</Button>
    <Block as="span" marginLeft="scale300" />
    <Button isSelected>Selected</Button>
    <Block as="span" marginLeft="scale300" />
    <Button disabled>Disabled</Button>
  </React.Fragment>
);
