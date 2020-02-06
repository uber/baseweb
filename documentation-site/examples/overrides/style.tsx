import * as React from 'react';
import {Button} from 'spaceweb/button';

export default () => (
  <Button
    overrides={{
      BaseButton: {
        style: {
          backgroundColor: 'red',
        },
      },
    }}
  >
    Submit
  </Button>
);
