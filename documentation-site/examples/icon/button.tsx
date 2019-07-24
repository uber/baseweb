import * as React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';

import {ChevronLeft, ChevronRight, Upload} from 'baseui/icon';

export default () => (
  <Block>
    <Block paddingBottom="scale300">
      <Button startEnhancer={ChevronLeft}>Start Enhancer</Button>
    </Block>

    <Block paddingBottom="scale300">
      <Button endEnhancer={ChevronRight}>End Enhancer</Button>
    </Block>

    <Block>
      <Button>
        <Upload />
      </Button>
    </Block>
  </Block>
);
