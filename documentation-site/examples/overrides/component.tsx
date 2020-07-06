import * as React from 'react';
import {Button} from 'baseui/button';

export default () => (
  <Button
    overrides={{
      Root: props => <button>{props.children}</button>,
    }}
  >
    Submit
  </Button>
);
