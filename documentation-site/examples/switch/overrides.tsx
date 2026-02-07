import * as React from "react";
import { Switch } from "baseui/switch";
import { expandBorderStyles } from "baseui/styles";

export default function Example() {
  const [checked, setChecked] = React.useState(true);
  return (
    <Switch
      checked={checked}
      onChange={() => setChecked(!checked)}
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            ...expandBorderStyles($theme.borders.border300),
          }),
        },
        Label: {
          style: ({ $theme }) => ({
            color: $theme.colors.warning,
          }),
        },
        Toggle: {
          style: ({ $checked, $theme }) => ({
            borderLeftColor: $theme.colors.warning,
            borderRightColor: $theme.colors.warning,
            borderTopColor: $theme.colors.warning,
            borderBottomColor: $theme.colors.warning,
            backgroundColor: $checked
              ? $theme.colors.backgroundAccent
              : $theme.colors.backgroundWarning,
          }),
        },
      }}
    >
      With style overrides
    </Switch>
  );
}
