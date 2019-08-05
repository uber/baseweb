import * as React from 'react';
import {useStyletron} from 'baseui';
import {Alert, Check, Search} from 'baseui/icon';
import {StatefulInput} from 'baseui/input';

function Before() {
  const [useCss, theme] = useStyletron();
  return (
    <div
      className={useCss({
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
  const [useCss, theme] = useStyletron();
  return (
    <div
      className={useCss({
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
  const [useCss, theme] = useStyletron();
  return (
    <div
      className={useCss({
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
  const [useCss, theme] = useStyletron();
  return (
    <div
      className={useCss({
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
    <StatefulInput
      overrides={{Before}}
      placeholder="Input with a Before component"
    />
    <br />

    <StatefulInput
      overrides={{After}}
      placeholder="Input with an After component"
    />
    <br />

    <StatefulInput
      error
      overrides={{After: Negative}}
      placeholder="Input with negative icon"
    />
    <br />

    <StatefulInput
      positive
      overrides={{After: Positive}}
      placeholder="Input with positive icon"
    />
  </div>
);
