/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import ButtonGroup from './button-group.js';
import {MODE} from './constants';

// may need to pull this out into stateful props
import type {PropsT} from './types.js';

export default class StatefulButtonGroup extends React.Component<PropsT, any> {
  constructor(props: PropsT) {
    super(props);

    this.state = {
      selected: props.selected ? [].concat(props.selected) : [],
    };
  }

  onChange = (index: number) => {
    if (this.props.mode === MODE.radio) {
      if (
        this.state.selected.length === 0 ||
        this.state.selected[0] !== index
      ) {
        this.setState({selected: [index]});
      } else {
        this.setState({selected: []});
      }
    }

    if (this.props.mode === MODE.checkbox) {
      if (!this.state.selected.includes(index)) {
        this.setState({selected: [...this.state.selected, index]});
      } else {
        this.setState({
          selected: this.state.selected.filter(value => value !== index),
        });
      }
    }
  };

  onClick = (event: SyntheticEvent<HTMLButtonElement>, index: number) => {
    if (this.props.onClick) {
      this.props.onClick(event, index);
    }

    this.onChange(index);
  };

  render() {
    return (
      <ButtonGroup
        {...this.props}
        onClick={this.onClick}
        selected={this.state.selected}
      >
        {this.props.children}
      </ButtonGroup>
    );
  }
}
