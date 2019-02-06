import React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';

export default () => (
  <React.Fragment>
    <Block paddingBottom="scale200">All disabled</Block>
    <ButtonGroup disabled>
      <Button>Label</Button>
      <Button>Label</Button>
      <Button>Label</Button>
    </ButtonGroup>
    <br />
    <Block paddingBottom="scale200">Single disabled</Block>
    <ButtonGroup>
      <Button disabled>Label</Button>
      <Button>Label</Button>
      <Button>Label</Button>
    </ButtonGroup>
  </React.Fragment>
);
