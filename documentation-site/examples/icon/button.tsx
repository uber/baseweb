import * as React from 'react';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';

import ChevronLeft from 'baseui/icon/chevron-left';
import ChevronRight from 'baseui/icon/chevron-right';
import Upload from 'baseui/icon/upload';

export default () => {
  const [useCss, theme] = useStyletron();
  return (
    <div>
      <div
        className={useCss({paddingBottom: theme.sizing.scale300})}
      >
        <Button startEnhancer={ChevronLeft}>Start Enhancer</Button>
      </div>

      <div
        className={useCss({paddingBottom: theme.sizing.scale300})}
      >
        <Button endEnhancer={ChevronRight}>End Enhancer</Button>
      </div>

      <div>
        <Button>
          <Upload />
        </Button>
      </div>
    </div>
  );
};
