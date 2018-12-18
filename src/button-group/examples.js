/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Block} from '../block/index.js';
import {Button} from '../button/index.js';
import Upload from '../icon/upload.js';

import {ButtonGroup, StatefulButtonGroup} from './index.js';
import examples from './examples-list.js';

class ControlledButtonGroup extends React.Component<*, *> {
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

export default {
  [examples.BUTTON_GROUP]: function SimpleStory() {
    return (
      <React.Fragment>
        <ButtonGroup kind="tertiary">
          <Button>Label</Button>
          <Button>Label</Button>
          <Button>Label</Button>
        </ButtonGroup>
        <br />
        <ButtonGroup kind="tertiary">
          <Button>
            <Upload size={24} />
          </Button>
          <Button>
            <Upload size={24} />
          </Button>
          <Button>
            <Upload size={24} />
          </Button>
        </ButtonGroup>
        <br />
        <ButtonGroup kind="tertiary">
          <Button startEnhancer={() => <Upload size={24} />}>Label</Button>
          <Button startEnhancer={() => <Upload size={24} />}>Label</Button>
          <Button startEnhancer={() => <Upload size={24} />}>Label</Button>
        </ButtonGroup>
      </React.Fragment>
    );
  },

  [examples.RADIO_MODE]: function RadioStory() {
    return (
      <StatefulButtonGroup mode="radio" initialState={{selected: 0}}>
        <Button>Label</Button>
        <Button>Label</Button>
      </StatefulButtonGroup>
    );
  },

  [examples.CHECKBOX_MODE]: function CheckboxStory() {
    return (
      <StatefulButtonGroup
        mode="checkbox"
        kind="secondary"
        initialState={{selected: [0, 1]}}
      >
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
      </StatefulButtonGroup>
    );
  },

  [examples.DISABLED]: function DisabledStory() {
    return (
      <React.Fragment>
        <Block paddingBottom="scale200">All disabled</Block>
        <ButtonGroup disabled kind="minimal">
          <Button>Label</Button>
          <Button>Label</Button>
          <Button>Label</Button>
        </ButtonGroup>
        <br />
        <Block paddingBottom="scale200">Single disabled</Block>
        <ButtonGroup kind="minimal">
          <Button disabled>Label</Button>
          <Button>Label</Button>
          <Button>Label</Button>
        </ButtonGroup>
      </React.Fragment>
    );
  },

  [examples.CONTROLLED]: function ControlledStory() {
    return <ControlledButtonGroup />;
  },
};
