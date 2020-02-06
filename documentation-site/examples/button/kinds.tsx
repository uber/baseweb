import * as React from 'react';
import {Block} from 'spaceweb/block';
import {Button, KIND} from 'spaceweb/button';

export default () => (
  <React.Fragment>
    <Button kind={KIND.primary}>Primary</Button>
    <Block marginBottom="scale300" />
    <Button kind={KIND.secondary}>Secondary</Button>
    <Block marginBottom="scale300" />
    <Button kind={KIND.tertiary}>Tertiary</Button>
    <Block marginBottom="scale300" />
    <Button kind={KIND.minimal}>Minimal</Button>
  </React.Fragment>
);
