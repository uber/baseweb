import * as React from 'react';
import {Badge, HIERARCHY} from 'baseui/badge';

export default function Example() {
  return (
    <React.Fragment>
      <div>Mohamed Naguib Station</div>
      <div>
        <Badge
          hierarchy={HIERARCHY.secondary}
          overrides={{Badge: {style: {marginRight: '8px'}}}}
          content="7 min"
        />

        <Badge
          hierarchy={HIERARCHY.secondary}
          content="Closest stop"
        />
      </div>
    </React.Fragment>
  );
}
