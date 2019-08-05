import * as React from 'react';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';

export default () => {
  const [useCss, theme] = useStyletron();
  return (
    <React.Fragment>
      <div
        className={useCss({paddingBottom: theme.sizing.scale200})}
      >
        All disabled
      </div>
      <ButtonGroup disabled>
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
      </ButtonGroup>
      <br />
      <div
        className={useCss({paddingBottom: theme.sizing.scale200})}
      >
        Single disabled
      </div>
      <ButtonGroup>
        <Button disabled>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
      </ButtonGroup>
    </React.Fragment>
  );
};
