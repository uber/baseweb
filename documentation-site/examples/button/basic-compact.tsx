import * as React from 'react';
import {Button, SIZE} from 'baseui/button';
import {useStyletron} from 'baseui';

export default () => {
  const [useCss, theme] = useStyletron();
  return (
    <React.Fragment>
      <Button size={SIZE.compact}>Compact size</Button>
      <div
        className={useCss({marginBottom: theme.sizing.scale300})}
      />
      <Button size={SIZE.default}>Default size</Button>
      <div
        className={useCss({marginBottom: theme.sizing.scale300})}
      />
      <Button size={SIZE.large}>Large size</Button>
    </React.Fragment>
  );
};
