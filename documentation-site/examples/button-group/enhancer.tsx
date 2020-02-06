import * as React from 'react';
import {Button} from 'spaceweb/button';
import {ButtonGroup} from 'spaceweb/button-group';
import {Upload} from 'spaceweb/icon';

export default () => (
  <ButtonGroup>
    <Button startEnhancer={() => <Upload size={24} />}>
      Label
    </Button>
    <Button startEnhancer={() => <Upload size={24} />}>
      Label
    </Button>
    <Button startEnhancer={() => <Upload size={24} />}>
      Label
    </Button>
  </ButtonGroup>
);
