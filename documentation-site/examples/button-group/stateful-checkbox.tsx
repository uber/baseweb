import * as React from 'react';
import {Button} from 'spaceweb/button';
import {StatefulButtonGroup, MODE} from 'spaceweb/button-group';

export default () => (
  <StatefulButtonGroup
    mode={MODE.checkbox}
    initialState={{selected: [0, 1]}}
  >
    <Button>Label</Button>
    <Button>Label</Button>
    <Button>Label</Button>
  </StatefulButtonGroup>
);
