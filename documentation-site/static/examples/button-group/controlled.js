import React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';

export default class ControlledButtonGroup extends React.Component {
  state = {selected: 1, boldClickCount: 0};

  handleClick = (event, index) => {
    if (this.state.selected !== index) {
      this.setState({selected: index});
    }
  };

  handleBold = event => {
    this.setState(prevState => ({
      boldClickCount: prevState.boldClickCount + 1,
    }));
  };

  render() {
    return (
      <React.Fragment>
        <ButtonGroup
          selected={this.state.selected}
          mode="radio"
          onClick={this.handleClick}
        >
          <Button onClick={this.handleBold}>Bold</Button>
          <Button>Normal</Button>
        </ButtonGroup>

        <Block
          font={this.state.selected === 0 ? 'font450' : 'font400'}
          paddingTop="scale400"
        >
          Lorem ipsum dolor sit amet, ea insolens deseruisse mnesarchum mea. An
          munere utroque mentitum vis, ea rebum inani iudicabit has. Cu his
          dolorum perpetua. Mea atqui tation partem ne, ei vim etiam volumus
          nominavi. Cum id atqui cotidieque, quaeque nostrum salutandi cum at,
          idque scaevola platonem mei ad.
        </Block>

        <Block paddingTop="scale800">
          The Bold option has been selected {this.state.boldClickCount} times
        </Block>
      </React.Fragment>
    );
  }
}
