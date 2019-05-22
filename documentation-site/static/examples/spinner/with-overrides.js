import * as React from 'react';
import {Spinner} from 'baseui/spinner';

export default () => (
  <Spinner
    overrides={{
      Svg: {
        props: {
          'data-label': 'data-label',
        },
        style: ({$theme}) => ({
          borderRadiusTopLeft: '50%',
          borderRadiusTopRight: '50%',
          borderRadiusBottomRight: '50%',
          borderRadiusBottomLeft: '50%',
          backgroundColor: $theme.colors.primary50,
        }),
      },
    }}
  />
);
