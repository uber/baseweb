import * as React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';

interface State {
  selected: number;
  boldClickCount: number;
}

class ControlledButtonGroup extends React.Component<{}, State> {
  state = {selected: 1, boldClickCount: 0};
  render() {
    return (
      <React.Fragment>
        <ButtonGroup
          selected={this.state.selected}
          mode="radio"
          onClick={(_, index) => {
            if (this.state.selected !== index) {
              this.setState({selected: index});
            }
          }}
        >
          <Button
            onClick={() => {
              this.setState((prevState: State) => ({
                boldClickCount: prevState.boldClickCount + 1,
              }));
            }}
          >
            Bold
          </Button>
          <Button>Normal</Button>
        </ButtonGroup>

        <Block
          font={this.state.selected === 0 ? 'font450' : 'font400'}
          paddingTop="scale400"
        >
          Lorem ipsum dolor sit amet, ea insolens deseruisse
          mnesarchum mea. An munere utroque mentitum vis, ea rebum
          inani iudicabit has. Cu his dolorum perpetua. Mea atqui
          tation partem ne, ei vim etiam volumus nominavi. Cum id
          atqui cotidieque, quaeque nostrum salutandi cum at, idque
          scaevola platonem mei ad.
        </Block>

        <Block paddingTop="scale800">
          The Bold option has been selected{' '}
          {this.state.boldClickCount} times
        </Block>
      </React.Fragment>
    );
  }
}

export default ControlledButtonGroup;
