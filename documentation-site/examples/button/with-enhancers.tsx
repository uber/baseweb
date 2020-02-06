import * as React from 'react';
import {Button} from 'spaceweb/button';
import {Upload, ArrowRight} from 'spaceweb/icon';

export default () => (
  <React.Fragment>
    <p>
      <Button startEnhancer={() => <ArrowRight size={24} />}>
        Start Enhancer
      </Button>
    </p>
    <p>
      <Button endEnhancer={() => <Upload size={24} />}>
        End Enhancer
      </Button>
    </p>
  </React.Fragment>
);
