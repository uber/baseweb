import React from 'react';
import {Spinner} from 'baseui/spinner';

export default () => (
  <Spinner
    overrides={{
      Svg: {
        props: {
          'data-label': 'data-label',
        },
        style: ({$theme}) => ({
          borderRadius: '50%',
          backgroundColor: $theme.colors.primary50,
        }),
      },
    }}
  />
);
