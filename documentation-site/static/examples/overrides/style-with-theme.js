import React from 'react';
import {Button} from 'baseui/button';

export default () => (
  <Button
    overrides={{
      BaseButton: {
        style: ({$theme}) => ({backgroundColor: $theme.colors.warning}),
      },
    }}
  >
    Submit
  </Button>
);
