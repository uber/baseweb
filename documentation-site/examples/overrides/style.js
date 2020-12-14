// @flow
import * as React from 'react';
import {Button} from 'baseui/button';

export default function Example() {
  return (
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
}
