// @flow
import * as React from 'react';
import {Spinner} from 'baseui/spinner';

export default () => (
  <Spinner
    overrides={{
      ActivePath: {
        style: ({$theme}) => ({fill: $theme.colors.negative}),
      },
    }}
  />
);
