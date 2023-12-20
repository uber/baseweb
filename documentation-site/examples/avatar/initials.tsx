import * as React from 'react';
import {Avatar} from 'baseui/avatar';

export default function Example() {
  return (
    <React.Fragment>
      {['scale1000', 'scale1200', 'scale1400', '64px'].map(
        (size) => (
          <Avatar name={`Han Solo`} size={size} key={size} />
        ),
      )}
    </React.Fragment>
  );
}
