// @flow
import * as React from 'react';
import {Button, KIND} from 'baseui/button';
import {useStyletron} from 'baseui';

export default () => {
  const [useCss, theme] = useStyletron();

  const space = useCss({marginLeft: theme.sizing.scale300});

  return (
    <React.Fragment>
      <Button>Primary</Button>
      <span className={space} />
      <Button kind={KIND.secondary}>Secondary</Button>
      <span className={space} />
      <Button kind={KIND.tertiary}>Tertiary</Button>
      <span className={space} />
      <Button kind={KIND.minimal}>Minimal</Button>
    </React.Fragment>
  );
};
