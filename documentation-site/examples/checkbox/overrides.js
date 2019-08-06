// @flow
import * as React from 'react';
import {Checkbox} from 'baseui/checkbox';

export default () => {
  const [checked, setChecked] = React.useState(true);
  return (
    <Checkbox
      checked={checked}
      onChange={() => setChecked(!checked)}
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
            backgroundColor: $checked
              ? $theme.colors.warning
              : null,
          }),
        },
      }}
    >
      With style overrides
    </Checkbox>
  );
};
