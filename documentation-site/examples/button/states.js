// @flow
import * as React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';

export default () => (
  <React.Fragment>
    <Button>No state</Button>
    <Block marginBottom="scale300" />
    <Button isLoading>Loading</Button>
    <Block marginBottom="scale300" />
    <Button isSelected>Selected</Button>
    <Block marginBottom="scale300" />
    <Button disabled>Disabled</Button>
  </React.Fragment>
);
