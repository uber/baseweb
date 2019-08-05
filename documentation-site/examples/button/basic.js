// @flow
import * as React from 'react';
import {Button, KIND} from 'baseui/button';
import {useStyletron} from 'baseui';

export default () => {
  const [useCss, theme] = useStyletron();
  return (
    <React.Fragment>
      <Button>Primary</Button>
      <div
        className={useCss({marginLeft: theme.sizing.scale300})}
      />
      <Button kind={KIND.secondary}>Secondary</Button>
      <div
        className={useCss({marginLeft: theme.sizing.scale300})}
      />
      <Button kind={KIND.tertiary}>Tertiary</Button>
      <div
        className={useCss({marginLeft: theme.sizing.scale300})}
      />
      <Button kind={KIND.minimal}>Minimal</Button>
    </React.Fragment>
  );
};
