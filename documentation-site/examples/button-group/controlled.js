// @flow
import * as React from 'react';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';

function ControlledButtonGroup() {
  const [css, theme] = useStyletron();
  const [selected, setSelected] = React.useState(1);
  const [boldClickCount, setBoldClickCount] = React.useState(0);

  const fontWeight =
    selected === 0
      ? theme.typography.font350
      : theme.typography.font300;

  return (
    <React.Fragment>
      <ButtonGroup
        selected={selected}
        mode="radio"
        onClick={(event, index) => {
          if (selected !== index) {
            setSelected(index);
          }
        }}
      >
        <Button
          onClick={() => setBoldClickCount(boldClickCount + 1)}
        >
          Bold
        </Button>
        <Button>Normal</Button>
      </ButtonGroup>

      <div
        className={css({
          ...fontWeight,
          paddingTop: theme.sizing.scale400,
        })}
      >
        Lorem ipsum dolor sit amet, ea insolens deseruisse
        mnesarchum mea. An munere utroque mentitum vis, ea rebum
        inani iudicabit has. Cu his dolorum perpetua. Mea atqui
        tation partem ne, ei vim etiam volumus nominavi. Cum id
        atqui cotidieque, quaeque nostrum salutandi cum at, idque
        scaevola platonem mei ad.
      </div>

      <div className={css({paddingTop: theme.sizing.scale800})}>
        The Bold option has been selected {boldClickCount} times
      </div>
    </React.Fragment>
  );
}

export default ControlledButtonGroup;
