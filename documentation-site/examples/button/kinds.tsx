import * as React from 'react';
import {Block} from 'baseui/block';
import {Button, KIND} from 'baseui/button';

export default function Example() {
  return (
    <React.Fragment>
      <Button kind={KIND.primary}>Primary</Button>
      <Block marginBottom="scale300" />
      <Button kind={KIND.secondary}>Secondary</Button>
      <Block marginBottom="scale300" />
      <Button kind={KIND.tertiary}>Tertiary</Button>
    </React.Fragment>
  );
}
