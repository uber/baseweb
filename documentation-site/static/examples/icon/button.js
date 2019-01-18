import React from 'react';
import {Block} from 'baseui/block';
import {Button, SHAPE} from 'baseui/button';

import ChevronLeft from 'baseui/icon/chevron-left';
import ChevronRight from 'baseui/icon/chevron-right';
import Upload from 'baseui/icon/upload';

export default () => (
  <Block>
    <Block paddingBottom="scale300">
      <Button startEnhancer={ChevronLeft}>Start Enhancer</Button>
    </Block>

    <Block paddingBottom="scale300">
      <Button endEnhancer={ChevronRight}>End Enhancer</Button>
    </Block>

    <Block>
      <Button shape={SHAPE.square}>
        <Upload />
      </Button>
    </Block>
  </Block>
);
