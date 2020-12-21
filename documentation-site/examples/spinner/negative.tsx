import * as React from 'react';
import {Spinner} from 'baseui/spinner';

export default function Example() {
  return (
    <Spinner
      overrides={{
        ActivePath: {
          style: ({$theme}) => ({fill: $theme.colors.negative}),
        },
      }}
    />
  );
}
