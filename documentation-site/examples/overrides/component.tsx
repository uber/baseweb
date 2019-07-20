import * as React from 'react';
import {Button} from 'baseui/button';

export default () => (
  <Button
    overrides={{
      BaseButton: props => <button>{props.children}</button>,
    }}
  >
    Submit
  </Button>
);
