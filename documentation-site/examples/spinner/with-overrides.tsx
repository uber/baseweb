import * as React from 'react';
import {Spinner} from 'baseui/spinner';
import {expandBorderRadiusStyles} from 'baseui/styles';

export default () => (
  <Spinner
    overrides={{
      Svg: {
        props: {
          'data-label': 'data-label',
        },
        style: ({$theme}) => ({
          ...expandBorderRadiusStyles('50%'),
          backgroundColor: $theme.colors.primary50,
        }),
      },
    }}
  />
);
