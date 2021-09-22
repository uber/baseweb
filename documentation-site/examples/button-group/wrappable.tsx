import * as React from 'react';
import {Button} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';

export default function Example() {
  return (
    <ButtonGroup
      overrides={{
        Root: {
          style: {flexWrap: 'wrap'},
        },
      }}
    >
      <Button>Label</Button>
      <Button>Label</Button>
      <Button>Label</Button>
    </ButtonGroup>
  );
}
