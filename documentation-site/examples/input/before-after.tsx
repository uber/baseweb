import * as React from 'react';
import {useStyletron} from 'baseui';
import {Alert, Check, Search} from 'baseui/icon';
import {Input} from 'baseui/input';

function Before() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.sizing.scale500,
      })}
    >
      <Search size="18px" />
    </div>
  );
}

function After() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        paddingRight: theme.sizing.scale500,
      })}
    >
      <Search size="18px" />
    </div>
  );
}

function Negative() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        paddingRight: theme.sizing.scale500,
        color: theme.colors.negative400,
      })}
    >
      <Alert size="18px" />
    </div>
  );
}

function Positive() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        paddingRight: theme.sizing.scale500,
        color: theme.colors.positive400,
      })}
    >
      <Check size="18px" />
    </div>
  );
}

export default () => (
  <div>
    <Input
      overrides={{Before}}
      placeholder="Input with a Before component"
    />
    <br />

    <Input
      overrides={{After}}
      placeholder="Input with an After component"
    />
    <br />

    <Input
      error
      overrides={{After: Negative}}
      placeholder="Input with negative icon"
    />
    <br />

    <Input
      positive
      overrides={{After: Positive}}
      placeholder="Input with positive icon"
    />
  </div>
);
