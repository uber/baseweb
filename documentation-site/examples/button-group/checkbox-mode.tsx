import * as React from 'react';
import {Button} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';

export default function Example() {
  const [selected, setSelected] = React.useState([0, 1]);
  return (
    <ButtonGroup
      mode="checkbox"
      selected={selected}
      onClick={(_event, index) => {
        if (!selected.includes(index)) {
          setSelected([...selected, index]);
        } else {
          setSelected(selected.filter((value) => value !== index));
        }
      }}
    >
      <Button>Label</Button>
      <Button>Label</Button>
      <Button>Label</Button>
    </ButtonGroup>
  );
}
