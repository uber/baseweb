import * as React from 'react';
import {Button} from 'spaceweb/button';

export default () => (
  <Button
    overrides={{
      BaseButton: props => <button>{props.children}</button>,
    }}
  >
    Submit
  </Button>
);
