import React from 'react';
import {ButtonGroup} from 'baseui/button-group';
import Upload from 'baseui/icon/upload.js';
import {Button} from 'baseui/button';

export default () => (
  <React.Fragment>
    <ButtonGroup>
      <Button
        overrides={{
          BaseButton: {
            style: props => ({color: '#000'}),
          },
        }}
      >
        Label
      </Button>
      <Button
        overrides={{
          BaseButton: {
            style: props => ({color: '#000'}),
          },
        }}
      >
        Label
      </Button>
      <Button
        overrides={{
          BaseButton: {
            style: props => ({color: '#000'}),
          },
        }}
      >
        Label
      </Button>
    </ButtonGroup>
  </React.Fragment>
);
