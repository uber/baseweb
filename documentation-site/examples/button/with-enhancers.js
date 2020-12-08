// @flow
import * as React from 'react';
import {Button} from 'baseui/button';
import Upload from 'baseui/icon/upload';
import ArrowRight from 'baseui/icon/arrow-right';

export default function Example() {
  return (
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
}
