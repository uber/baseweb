import * as React from 'react';
import {Button, KIND} from 'baseui/button';
import {Block} from 'baseui/block';

export default () => (
  <React.Fragment>
    <Button>Primary</Button>
    <Block as="span" marginLeft="scale300" />
    <Button kind={KIND.secondary}>Secondary</Button>
    <Block as="span" marginLeft="scale300" />
    <Button kind={KIND.tertiary}>Tertiary</Button>
    <Block as="span" marginLeft="scale300" />
    <Button kind={KIND.minimal}>Minimal</Button>
  </React.Fragment>
);
