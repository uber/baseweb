// @flow
import * as React from 'react';
import {Button} from 'baseui/button';
import {ButtonGroup, MODE} from 'baseui/button-group';

export default function Example() {
  const [selected, setSelected] = React.useState();
  return (
    <ButtonGroup
      mode={MODE.radio}
      selected={selected}
      onClick={(event, index) => {
        setSelected(index);
      }}
    >
      <Button>Label</Button>
      <Button>Label</Button>
      <Button>Label</Button>
    </ButtonGroup>
  );
}
