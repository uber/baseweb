import * as React from 'react';
import {Button, KIND} from 'baseui/button';
import {useStyletron} from 'baseui';

export default () => {
  const [useCss, theme] = useStyletron();
  return (
    <React.Fragment>
      <Button>No state</Button>
      <span
        className={useCss({marginLeft: theme.sizing.scale300})}
      />
      <Button isLoading>Loading</Button>
      <span
        className={useCss({marginLeft: theme.sizing.scale300})}
      />
      <Button isSelected>Selected</Button>
      <span
        className={useCss({marginLeft: theme.sizing.scale300})}
      />
      <Button disabled>Disabled</Button>
    </React.Fragment>
  );
};
