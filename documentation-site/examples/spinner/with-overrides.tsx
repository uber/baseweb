import * as React from 'react';
import {Spinner} from 'baseui/spinner';

export default function Example() {
  return (
    <Spinner
      overrides={{
        Svg: {
          props: {
            'data-label': 'data-label',
          },
          style: ({$theme}) => ({
            borderTopLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '50%',
            borderBottomLeftRadius: '50%',
            backgroundColor: $theme.colors.primary50,
          }),
        },
      }}
    />
  );
}
