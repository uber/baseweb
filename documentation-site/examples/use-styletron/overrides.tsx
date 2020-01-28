import React from 'react';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';

export default () => {
  const [css, theme] = useStyletron();
  return (
    <Button
      disabled
      overrides={{
        BaseButton: props => {
          return (
            <button
              disabled={props.disabled}
              className={css({
                background: props.$disabled
                  ? theme.colors.negative400
                  : theme.colors.warning400,
                color: theme.colors.backgroundPrimary,
              })}
            >
              {props.children}
            </button>
          );
        },
      }}
    >
      this is a BaseButton
    </Button>
  );
};
