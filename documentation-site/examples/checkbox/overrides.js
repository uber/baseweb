// @flow
import * as React from 'react';
import {StatefulCheckbox} from 'baseui/checkbox';

export default () => (
  <StatefulCheckbox
    onChange={console.log}
    overrides={{
      Root: {
        style: ({$theme}) => ({
          ...$theme.borders.border300,
        }),
      },
      Label: {
        style: ({$theme}) => ({
          color: $theme.colors.warning,
        }),
      },
      Checkmark: {
        style: ({$checked, $theme}) => ({
          borderColor: $theme.colors.warning,
          backgroundColor: $checked ? $theme.colors.warning : null,
        }),
      },
    }}
  >
    With style overrides
  </StatefulCheckbox>
);
