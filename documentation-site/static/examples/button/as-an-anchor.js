import React from 'react';
import {Button} from 'baseui/button';

export default () => (
  <React.Fragment>
    <Button
      href="#"
      overrides={{
        BaseButton: {
          props: {
            $as: 'a',
          },
        },
      }}
    >
      I am a Link
    </Button>
  </React.Fragment>
);
