import * as React from 'react';
import {useStyletron} from 'baseui';
import {Button} from 'spaceweb/button';

import {ChevronLeft, ChevronRight, Upload} from 'spaceweb/icon';

export default () => {
  const [css, theme] = useStyletron();
  return (
    <div>
      <div className={css({paddingBottom: theme.sizing.scale300})}>
        <Button startEnhancer={ChevronLeft}>Start Enhancer</Button>
      </div>

      <div className={css({paddingBottom: theme.sizing.scale300})}>
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
