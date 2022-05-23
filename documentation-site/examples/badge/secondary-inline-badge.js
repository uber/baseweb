// @flow
import * as React from 'react';
import {InlineBadge, HIERARCHY} from 'baseui/badge';

export default function Example() {
  return (
    <React.Fragment>
      <div>Mohamed Naguib Station</div>
      <div>
        <InlineBadge
          hierarchy={HIERARCHY.secondary}
          overrides={{Badge: {style: {marginRight: '8px'}}}}
        >
          7 min
        </InlineBadge>
        <InlineBadge hierarchy={HIERARCHY.secondary}>
          Closest Stop
        </InlineBadge>
      </div>
    </React.Fragment>
  );
}
