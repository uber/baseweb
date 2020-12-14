import * as React from 'react';
import {Skeleton} from 'baseui/skeleton';

export default function Example() {
  return (
    <Skeleton
      width="100px"
      height="100px"
      overrides={{
        Root: {
          style: {
            borderRadius: '50%',
          },
        },
      }}
    />
  );
}
