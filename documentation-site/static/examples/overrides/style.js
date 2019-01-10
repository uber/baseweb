import React from 'react';
import {Button} from 'baseui/button';

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
