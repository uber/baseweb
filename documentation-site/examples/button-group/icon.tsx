import * as React from 'react';
import {Button} from 'spaceweb/button';
import {ButtonGroup} from 'spaceweb/button-group';
import {Upload} from 'spaceweb/icon';

export default () => (
  <ButtonGroup>
    <Button>
      <Upload size={24} />
    </Button>
    <Button>
      <Upload size={24} />
    </Button>
    <Button>
      <Upload size={24} />
    </Button>
  </ButtonGroup>
);
