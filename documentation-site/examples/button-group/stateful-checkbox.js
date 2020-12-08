// @flow
import * as React from 'react';
import {Button} from 'baseui/button';
import {StatefulButtonGroup, MODE} from 'baseui/button-group';

export default function Example() {
  return (
    <StatefulButtonGroup
      mode={MODE.checkbox}
      initialState={{selected: [0, 1]}}
    >
      <Button>Label</Button>
      <Button>Label</Button>
      <Button>Label</Button>
    </StatefulButtonGroup>
  );
}
