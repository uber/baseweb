// @flow
import * as React from 'react';
import {Button} from 'baseui/button';
import {StatefulButtonGroup, MODE} from 'baseui/button-group';

export default () => (
  <StatefulButtonGroup
    mode={MODE.radio}
    initialState={{selected: 0}}
  >
    <Button>Label</Button>
    <Button>Label</Button>
    <Button>Label</Button>
  </StatefulButtonGroup>
);
