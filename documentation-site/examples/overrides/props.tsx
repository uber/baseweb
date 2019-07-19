import * as React from 'react';
import {Button} from 'baseui/button';

export default () => (
  <Button
    overrides={{
      BaseButton: {
        props: {
          'data-test': 'action-button',
        },
      },
    }}
  >
    Submit
  </Button>
);
