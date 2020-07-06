// @flow
import * as React from 'react';
import {Button} from 'baseui/button';

export default () => (
  <Button
    overrides={{
      Root: {
        style: ({$theme}) => ({
          backgroundColor: $theme.colors.warning,
        }),
      },
    }}
  >
    Submit
  </Button>
);
