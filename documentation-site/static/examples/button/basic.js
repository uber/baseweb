import React from 'react';
import {Button, KIND} from 'baseui/button';

export default () => (
  <React.Fragment>
    <Button>Primary</Button>
    <Button kind={KIND.secondary}>Secondary</Button>
    <Button kind={KIND.tertiary}>Tertiary</Button>
    <Button kind={KIND.minimal}>Minimal</Button>
  </React.Fragment>
);
