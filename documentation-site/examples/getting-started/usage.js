// @flow
import * as React from 'react';

import {StatefulInput} from 'baseui/input';
import {useStyletron} from 'baseui';

export default function() {
  const [useCss] = useStyletron();
  return (
    <div
      className={useCss({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      })}
    >
      <StatefulInput />
    </div>
  );
}
