import * as React from "react";
import { useStyletron } from "baseui";
import { StatefulCheckbox } from "baseui/checkbox-v2";
import { Alert } from "baseui/icon";

export default function Example() {
  const [css, theme] = useStyletron();
  return (
    <StatefulCheckbox
      onChange={console.log}
      overrides={{
        CheckmarkContainer: (props) => (
          <div
            className={css({
              color: props.checked
                ? theme.colors.primary
                : theme.colors.mono700,
              marginTop: "6px",
              marginRight: "3px",
            })}
          >
            <Alert />
          </div>
        ),
      }}
    >
      With style overrides
    </StatefulCheckbox>
  );
}
