import React from 'react';
import {Button} from 'baseui/button';
import {StatefulButtonGroup} from 'baseui/button-group';

export default () => (
  <StatefulButtonGroup mode="radio" initialState={{selected: 0}}>
    <Button>Label</Button>
    <Button>Label</Button>
  </StatefulButtonGroup>
);
